// ใส่ API Key ของคุณตรงนี้
const API_KEY = "AIzaSyBmCb6hZlCDsPbvuco82KS4mC6L5Y1Ai2I"; 

export const callGeminiAPI = async (prompt) => {
  if (!API_KEY) return "ไม่พบ API Key (กรุณาใส่ key ในไฟล์ utils/api.js)";
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  } catch (e) { return "เกิดข้อผิดพลาดในการเชื่อมต่อ AI"; }
};