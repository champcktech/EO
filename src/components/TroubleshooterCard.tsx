import React, { useState } from 'react';
import { Phone, Copy, Check, Download, Wrench, Shield, AlertCircle } from 'lucide-react';
import { DutyOfficer } from '../types';
import { getPositionBadge, downloadVCard, copyTextToClipboard } from '../utils/helpers';

interface TroubleshooterCardProps {
  officer: DutyOfficer;
  index: number;
  stationName: string;
  onStatusChange?: (id: string, status: DutyOfficer['status']) => void;
}

export const TroubleshooterCard: React.FC<TroubleshooterCardProps> = ({
  officer,
  index,
  stationName,
  onStatusChange
}) => {
  const [copied, setCopied] = useState(false);
  const positionInfo = getPositionBadge(officer.position);

  const handleCopy = async () => {
    const success = await copyTextToClipboard(officer.phone);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadVCard(officer, stationName);
  };

  const getStatusDisplay = () => {
    switch (officer.status) {
      case 'dispatched':
        return {
          label: 'ออกปฏิบัติงานนอกพื้นที่',
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      case 'break':
        return {
          label: 'พักเวร / สแตนด์บาย',
          color: 'bg-slate-700/50 text-slate-300 border-slate-600'
        };
      case 'on_duty':
      default:
        return {
          label: 'พร้อมปฏิบัติงาน',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div
      id={`troubleshooter-card-${index + 1}`}
      className="relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-600/60 p-5 shadow-lg hover:shadow-purple-950/40 transition duration-200 group"
    >
      {/* Top Bar: Numbering badge & Position Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-900/80 text-purple-200 font-mono font-bold text-sm border border-purple-600/40 shadow-sm">
              #{index + 1}
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-md font-semibold border ${positionInfo.color}`}
              title={positionInfo.desc}
            >
              {officer.position}
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusDisplay.color}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {statusDisplay.label}
          </span>
        </div>

        {/* Officer Name & Role */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-purple-200 transition">
            {officer.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>พนักงานแก้ไฟฟ้าขัดข้อง</span>
          </p>
        </div>
      </div>

      {/* Contact Section & Phone */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs text-slate-400">เบอร์โทรศัพท์ติดต่อ:</span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-mono font-bold text-amber-300 tracking-wider">
              {officer.phone}
            </span>
            <button
              id={`copy-phone-ts-${index + 1}`}
              onClick={handleCopy}
              className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
              title="คัดลอกเบอร์โทรศัพท์"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <a
            id={`call-ts-${index + 1}`}
            href={`tel:${officer.phone.replace(/[^0-9]/g, '')}`}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow transition active:scale-95 text-center"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>โทรออก</span>
          </a>

          <button
            id={`vcard-ts-${index + 1}`}
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs sm:text-sm transition cursor-pointer text-center"
            title="บันทึกผู้ติดต่อลงสมุดโทรศัพท์"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>บันทึกเบอร์</span>
          </button>
        </div>
      </div>
    </div>
  );
};
