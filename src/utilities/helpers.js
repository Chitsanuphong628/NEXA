export const norm = (s) => s.replace(/\s+/g, " ").trim();
export const isMoney = (s) => /[\d,]+\.\d{2}/.test(s); 
export const cleanAmount = (s) => parseFloat(s.replace(/[^0-9.-]/g, '')) || 0;

export const calculateSummary = (transactions) => {
  let income = 0, expense = 0;
  const monthsMap = {};
  const freqMap = {};
  
  if (!transactions || transactions.length === 0) {
      return { income: 0, expense: 0, dateRange: '-', monthly: [], frequency: [] };
  }

  transactions.forEach(tx => {
    const val = parseFloat(tx.amount.replace(/,/g, ''));
    if (tx.isPositive) income += val; else expense += val;
    
    // Parse Date (รองรับทั้ง YYYY และ DD/MM/YYYY)
    const dateParts = tx.date.split(' ')[0].split(/[\/\-.]/);
    const monthIdx = parseInt(dateParts[1]) - 1;
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const monthKey = months[monthIdx] || "N/A";
    
    monthsMap[monthKey] = (monthsMap[monthKey] || 0) + val;

    const name = tx.title.replace(/[\d\-:,]/g, '').trim() || "รายการทั่วไป"; 
    if (!freqMap[name]) freqMap[name] = { count: 0, total: 0, income: 0, expense: 0 };
    freqMap[name].count++;
    freqMap[name].total += val;
    if (tx.isPositive) freqMap[name].income += val; else freqMap[name].expense += val;
  });

  const monthOrder = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  const monthlyData = Object.entries(monthsMap).map(([name, value]) => ({ name, value })).sort((a,b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));
  const frequencyList = Object.entries(freqMap).map(([name, d]) => ({ name, ...d })).sort((a,b) => b.total - a.total);

  return { income, expense, monthly: monthlyData, frequency: frequencyList };
};