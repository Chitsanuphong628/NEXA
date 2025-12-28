import { isMoney, cleanAmount, norm } from './helpers';

// [แก้ไข 1] ลบ import pdfjs-dist ด้านบนออก เพื่อป้องกัน Server รัน
// import * as pdfjsLib from 'pdfjs-dist'; <--- ลบออกเลยครับ

// --- Helper Functions ---
const groupByLine = (items, yTol = 5) => {
  const lines = [];
  const sorted = [...items].sort((a, b) => b.y - a.y);
  for (const it of sorted) {
    const line = lines.find((l) => Math.abs(l.y - it.y) <= yTol);
    if (line) {
      line.items.push(it);
      line.y = (line.y * line.items.length + it.y) / (line.items.length + 1);
    } else {
      lines.push({ y: it.y, items: [it] });
    }
  }
  for (const l of lines) l.items.sort((a, b) => a.x - b.x);
  return lines.sort((a, b) => b.y - a.y);
};

const detectColumnCenters = (lines) => {
  const joined = lines.map((l) => ({
    y: l.y,
    text: norm(l.items.map((i) => i.str).join(" ")).toLowerCase(),
    items: l.items,
  }));

  const headerRow = joined.find((l) =>
    (l.text.includes("date") || l.text.includes("วันที่") || l.text.includes("วัน/เวลา")) &&
    (l.text.includes("balance") || l.text.includes("คงเหลือ"))
  );

  if (!headerRow) return null;

  const findCenter = (keywords) => {
    const it = headerRow.items.find((i) => keywords.some(k => i.str.toLowerCase().includes(k)));
    return it ? it.x : null;
  };

  return {
    headerY: headerRow.y,
    centers: {
      debit: findCenter(["debit", "ถอน", "withdraw", "จ่าย"]),
      credit: findCenter(["credit", "ฝาก", "deposit", "รับ"]),
    }
  };
};

// --- Main Parsing Function ---

export const parsePdfFile = async (file, password = null) => {
  try {
    console.log("Start parsing:", file.name);
    
    // [แก้ไข 2] ย้ายการ Import มาไว้ในฟังก์ชัน (Dynamic Import)
    // โค้ดส่วนนี้จะทำงานเมื่ออยู่บน Browser เท่านั้น ทำให้ไม่ Error บน Server
    const pdfjsLib = await import('pdfjs-dist');

    // [แก้ไข 3] ตั้งค่า Worker หลังจากโหลด Library เสร็จ
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

    const buf = await file.arrayBuffer();
    
    const loadingTask = pdfjsLib.getDocument({
      data: buf,
      password: password,
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
      cMapPacked: true,
    });

    const doc = await loadingTask.promise;
    console.log("Pages found:", doc.numPages);

    const processedTx = [];
    let finalBalance = 0;
    let previousBalance = null;

    for (let p = 1; p <= Math.min(doc.numPages, 10); p++) {
      const page = await doc.getPage(p);
      const tc = await page.getTextContent();
      const items = tc.items
        .map(i => ({ str: String(i.str).trim(), x: i.transform[4], y: i.transform[5] }))
        .filter(i => i.str);
      
      const lines = groupByLine(items);
      const colInfo = detectColumnCenters(lines);
      
      let dataLines = colInfo ? lines.filter(l => l.y < colInfo.headerY - 10) : lines;

      for (const line of dataLines) {
        const dateMatch = line.items.map(i => i.str.match(/(\d{1,2}[\/\-.]\d{1,2}[\/\-.](?:\d{2}|\d{4}))/)).find(m => m);
        const isHeaderArtifact = line.items.some(i => i.str.toLowerCase().includes('date') || i.str.includes('วันที่'));

        if (dateMatch && !isHeaderArtifact) {
          const dateStr = dateMatch[0];
          const moneyItems = line.items
            .filter(i => isMoney(i.str))
            .map(i => ({ ...i, val: cleanAmount(i.str) }))
            .sort((a,b) => a.x - b.x);

          if (moneyItems.length >= 2) {
            let balance = moneyItems[moneyItems.length - 1].val;
            let amount = moneyItems[moneyItems.length - 2].val;
            let isPositive = false;

            if (previousBalance === null) {
                if (colInfo && colInfo.centers) {
                    const itemX = moneyItems[moneyItems.length - 2].x;
                    const distDebit = Math.abs(itemX - (colInfo.centers.debit || -9999));
                    const distCredit = Math.abs(itemX - (colInfo.centers.credit || -9999));
                    isPositive = distCredit < distDebit;
                } else {
                    const lineText = line.items.map(i=>i.str).join(' ');
                    isPositive = (lineText.includes('ฝาก') || lineText.includes('รับ'));
                }
                previousBalance = isPositive ? balance - amount : balance + amount;
            } else {
                const diff = balance - previousBalance;
                if (diff > 0.01) isPositive = true;
                else if (diff < -0.01) isPositive = false;
                else isPositive = (amount > 0);
                
                if (Math.abs(Math.abs(diff) - amount) > 1 && Math.abs(diff) > 0.01) amount = Math.abs(diff);
            }
            
            previousBalance = balance;
            if (balance > 0) finalBalance = balance;

            const descParts = line.items.filter(i => !i.str.match(/(\d{1,2}[\/\-.]\d{1,2}[\/\-.](?:\d{2}|\d{4}))/) && !isMoney(i.str));
            const description = descParts.map(i => i.str).join(" ");

            processedTx.push({
                id: Math.random(),
                date: dateStr,
                title: description || "รายการ",
                amount: amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
                isPositive
            });
          }
        }
      }
    }

 return { transactions: processedTx, totalBalance: finalBalance };
  } catch (error) {
    // [แก้ไขใหม่] เช็คก่อนว่าเป็น Error เรื่องรหัสผ่านหรือไม่
    // ถ้าใช่ ให้โยน error ต่อไปเลย ไม่ต้องสั่ง console.error (หน้าจอจะได้ไม่แดง)
    if (error.name === 'PasswordException' || error.message === 'No password given') {
      throw error; 
    }

    // ถ้าเป็น Error อื่นๆ ค่อยแสดงสีแดง
    console.error("Parse Error:", error);
    return null;
  }
};