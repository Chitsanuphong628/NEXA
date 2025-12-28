import React, { useRef, useState } from 'react';
import { FileUp, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { parsePdfFile } from '../../src/utilities/pdfParser'; 
import { PasswordModal } from './Modals'; 

// [แก้ไข] รับ prop autoPassword เพิ่ม
export default function ReadPDF({ onDataLoaded, autoPassword }) {
  const fileInputRef = useRef(null);
  const [isParsing, setIsParsing] = useState(false);
  const [status, setStatus] = useState(null);
  const [pendingFile, setPendingFile] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
        // [แก้ไข] ส่ง autoPassword ไปลองก่อนเลย (ถ้ามี)
        processFile(file, autoPassword);
    }
  };

  const processFile = async (file, password = null) => {
    setIsParsing(true);
    setStatus(null);
    try {
      // ลองอ่านไฟล์ด้วย password ที่ส่งมา (อาจจะเป็น null หรือ autoPassword)
      const result = await parsePdfFile(file, password);
      
      if (result) {
        onDataLoaded(result.transactions, result.totalBalance);
        setStatus('success');
        setShowPasswordModal(false);
        setPendingFile(null);
      } else {
        setStatus('error');
      }
    } catch (e) {
      // ถ้าติดรหัสผ่าน
      if (e.name === 'PasswordException' || e.message === 'No password given') {
        
        // [เพิ่ม Logic] ถ้าลองด้วย autoPassword แล้วยังผิด ให้ถามรหัสใหม่
        // แต่ถ้ายังไม่ได้ลอง (password == null) และไม่มี autoPassword ก็ถามเลย
        if (password && password === autoPassword) {
            // ลอง Auto แล้วผิด -> เปิด Modal ถาม
            setPendingFile(file);
            setShowPasswordModal(true);
        } else if (!password && !autoPassword) {
             // ไม่มี Auto -> เปิด Modal ถาม
             setPendingFile(file);
             setShowPasswordModal(true);
        } else {
             // กรณีอื่นๆ (เช่น ลองรหัสผิดจาก Modal)
             setPendingFile(file);
             setShowPasswordModal(true);
        }
      } else {
        console.error(e);
        setStatus('error');
      }
    } finally {
      setIsParsing(false);
      if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileChange} />
        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/30" disabled={isParsing}>
          {isParsing ? <Loader2 className="animate-spin" size={18} /> : <FileUp size={18} />}
          <span className="hidden sm:inline">Add Transaction</span>
        </button>
        {status === 'success' && <span className="text-emerald-500 text-xs font-bold flex items-center gap-1 animate-in fade-in"><CheckCircle2 size={14}/> เรียบร้อย</span>}
        {status === 'error' && <span className="text-rose-500 text-xs font-bold flex items-center gap-1 animate-in fade-in"><AlertCircle size={14}/> ผิดพลาด</span>}
      </div>
      <PasswordModal isOpen={showPasswordModal} onSubmit={(pw) => processFile(pendingFile, pw)} />
    </>
  );
}