import React, { useState } from 'react';
import { Radio, Phone, Copy, Check, Download, ShieldCheck, UserCheck, Smartphone } from 'lucide-react';
import { DutyOfficer } from '../types';
import { getPositionBadge, downloadVCard, copyTextToClipboard } from '../utils/helpers';

interface EOCardProps {
  officer: DutyOfficer;
  stationName: string;
  onStatusChange?: (status: DutyOfficer['status']) => void;
}

export const EOCard: React.FC<EOCardProps> = ({ officer, stationName, onStatusChange }) => {
  const [copied, setCopied] = useState(false);
  const positionInfo = getPositionBadge(officer.position);

  const handleCopyPhone = async () => {
    const success = await copyTextToClipboard(officer.phone);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadVCard = () => {
    downloadVCard(officer, stationName);
  };

  return (
    <div
      id="eo-officer-card"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-950/70 via-slate-900 to-purple-900/30 border-2 border-purple-500/50 p-5 sm:p-6 shadow-xl shadow-purple-950/30 transition hover:border-purple-400/80"
    >
      {/* Background glow and badge */}
      <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-40 h-40 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-purple-800/40">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
          </span>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              ผู้ควบคุมและสั่งการเวร E/O
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
              พนักงานสั่งงานแก้กระแสไฟฟ้าขัดข้อง E/O
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            กำลังปฏิบัติหน้าที่
          </span>
        </div>
      </div>

      {/* Officer Main Body Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Avatar & Name */}
        <div className="md:col-span-7 flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-amber-500 p-0.5 shadow-lg flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center text-center p-1">
              <UserCheck className="w-8 h-8 sm:w-9 sm:h-9 text-amber-400 mb-0.5" />
              <span className="text-[10px] font-bold text-purple-200 uppercase tracking-tight">
                E/O หัวหน้าเวร
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className={`text-xs px-2.5 py-0.5 rounded-md font-semibold border ${positionInfo.color}`}
                title={positionInfo.desc}
              >
                {officer.position}
              </span>
              <span className="text-xs text-purple-300/80 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40">
                ศูนย์ประสานงานสั่งการ E/O
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {officer.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
              ผู้รับผิดชอบรับแจ้งเหตุและสั่งการทีมช่างประจำเวร
            </p>
          </div>
        </div>

        {/* Right: Phone & Action Buttons */}
        <div className="md:col-span-5 flex flex-col gap-2.5 bg-slate-950/60 p-3.5 rounded-xl border border-purple-800/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">เบอร์โทรศัพท์สั่งการ E/O:</span>
            <span className="text-xs text-amber-400 font-semibold">โทรฟรีฉุกเฉิน</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-xl sm:text-2xl font-mono font-bold text-amber-300 tracking-wider">
              {officer.phone}
            </div>

            <button
              id="copy-eo-phone-btn"
              onClick={handleCopyPhone}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
              title="คัดลอกเบอร์โทรศัพท์"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <a
              id="call-eo-btn"
              href={`tel:${officer.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-md transition active:scale-95 text-center"
            >
              <Phone className="w-4 h-4 animate-bounce" />
              <span>โทรออกทันที</span>
            </a>

            <button
              id="save-eo-contact-btn"
              onClick={handleDownloadVCard}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-500/40 font-medium text-xs sm:text-sm transition cursor-pointer text-center"
              title="บันทึกเบอร์ลงในสมุดโทรศัพท์มือถือ"
            >
              <Download className="w-3.5 h-3.5 text-purple-300" />
              <span>บันทึกเบอร์ (.vcf)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
