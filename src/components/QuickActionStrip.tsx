import React from 'react';
import { Copy, Printer, Edit3, PlusCircle, BookOpen, Share2, Check, UserCheck } from 'lucide-react';

interface QuickActionStripProps {
  onOpenLineModal: () => void;
  onOpenPrintModal: () => void;
  onOpenEditModal: () => void;
  onOpenDirectoryModal: () => void;
  onOpenNewIncidentModal: () => void;
  onOpenSafetyModal: () => void;
  onQuickCopyLine: () => void;
  copied: boolean;
  activeIncidentsCount: number;
}

export const QuickActionStrip: React.FC<QuickActionStripProps> = ({
  onOpenLineModal,
  onOpenPrintModal,
  onOpenEditModal,
  onOpenDirectoryModal,
  onOpenNewIncidentModal,
  onOpenSafetyModal,
  onQuickCopyLine,
  copied,
  activeIncidentsCount
}) => {
  return (
    <div className="bg-slate-900/95 border-b border-slate-800 py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Fast Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Edit Shift Button (อันดับ 1) */}
          <button
            id="edit-shift-btn"
            onClick={onOpenEditModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
            title="แก้ไขข้อมูลเวร วัน เวลา ผู้สั่งการ และช่างประจำเวร"
          >
            <Edit3 className="w-4 h-4 text-amber-300" />
            <span>แก้ไขข้อมูลเวร</span>
          </button>

          {/* 2. Quick Copy LINE Message Button (อันดับ 2) */}
          <button
            id="quick-copy-line-btn"
            onClick={onQuickCopyLine}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
            title="คัดลอกข้อความสำหรับแชร์ลงไลน์กลุ่ม กฟส.ฝาง ทันที"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>คัดลอกสำเร็จแล้ว!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>คัดลอกข้อความส่ง LINE</span>
              </>
            )}
          </button>

          {/* 3. Directory & Presets Selector Button */}
          <button
            id="open-directory-btn"
            onClick={onOpenDirectoryModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-900/50 hover:bg-purple-800/80 text-purple-200 border border-purple-600/40 text-xs sm:text-sm transition cursor-pointer font-medium"
            title="เปิดทำเนียบรายชื่อพนักงาน กฟส.ฝาง และเลือกชุดเวร"
          >
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>ตัวเลือกรายชื่อ & ชุดเวร</span>
          </button>

          {/* 4. Preview & Customize LINE message */}
          <button
            id="preview-line-btn"
            onClick={onOpenLineModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">ดูตัวอย่างข้อความ</span>
            <span className="sm:hidden">ดูข้อความ</span>
          </button>

          {/* 5. Print/Export Poster */}
          <button
            id="print-poster-btn"
            onClick={onOpenPrintModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-blue-400" />
            <span>พิมพ์ใบเวร</span>
          </button>

          {/* 6. Safety guidelines */}
          <button
            id="safety-guide-btn"
            onClick={onOpenSafetyModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">แนวทางปลอดภัย</span>
          </button>
        </div>

        {/* Right Side: Incident Dispatch */}
        <div className="flex items-center gap-2">
          {/* New Incident Logger */}
          <button
            id="log-incident-btn"
            onClick={onOpenNewIncidentModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-medium text-xs sm:text-sm shadow-md transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>บันทึกรับแจ้งไฟดับ</span>
            {activeIncidentsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] bg-amber-400 text-slate-950 font-bold">
                {activeIncidentsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
