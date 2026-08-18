import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, Send, FileText, Sparkles } from 'lucide-react';
import { ShiftInfo } from '../types';
import { formatLineMessage, copyTextToClipboard } from '../utils/helpers';

interface LineShareModalProps {
  shift: ShiftInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const LineShareModal: React.FC<LineShareModalProps> = ({ shift, isOpen, onClose }) => {
  const [customText, setCustomText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setCustomText(formatLineMessage(shift));
    }
  }, [isOpen, shift]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyTextToClipboard(customText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setCustomText(formatLineMessage(shift));
  };

  const handleShareToLine = () => {
    const encodedText = encodeURIComponent(customText);
    window.open(`https://line.me/R/msg/text/?${encodedText}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="line-share-modal"
        className="relative w-full max-w-2xl bg-slate-900 border border-purple-600/40 rounded-2xl p-6 shadow-2xl text-slate-100 max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ข้อความสำหรับส่ง LINE กลุ่ม กฟส.ฝาง</h2>
              <p className="text-xs text-slate-400">คัดลอกข้อความรูปแบบมาตรฐานเพื่อแจ้งเวรในไลน์กลุ่ม</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Textarea preview */}
        <div className="my-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              ข้อความพรีวิว (สามารถแก้ไขเพิ่มเติมได้)
            </span>
            <button
              onClick={handleReset}
              className="text-purple-400 hover:text-purple-300 underline cursor-pointer"
            >
              คืนค่าข้อความเริ่มต้น
            </button>
          </div>

          <textarea
            id="line-message-textarea"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={11}
            className="w-full font-mono text-sm bg-slate-950/90 border border-slate-700/80 rounded-xl p-4 text-emerald-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-y leading-relaxed"
          />
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            พร้อมส่งต่อไปยังกลุ่มศูนย์สั่งการ & ช่างเวร กฟส.ฝาง
          </div>

          <div className="flex items-center gap-2">
            <button
              id="modal-line-share-app-btn"
              onClick={handleShareToLine}
              className="px-4 py-2 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-bold text-sm shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>เปิดแอป LINE</span>
            </button>

            <button
              id="modal-copy-line-btn"
              onClick={handleCopy}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-900/40 transition active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>คัดลอกเรียบร้อย!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>คัดลอกข้อความ</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
