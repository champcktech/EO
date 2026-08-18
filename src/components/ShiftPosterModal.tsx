import React from 'react';
import { X, Printer, Zap, Phone, Shield, Calendar, Clock, MapPin, Globe, ExternalLink } from 'lucide-react';
import { ShiftInfo } from '../types';

interface ShiftPosterModalProps {
  shift: ShiftInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const ShiftPosterModal: React.FC<ShiftPosterModalProps> = ({ shift, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-100 my-auto">
        {/* Action Header - Hidden when printing */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-purple-400" />
            <div>
              <h2 className="text-lg font-bold text-white">ใบประกาศเวรแก้ไฟฟ้าขัดข้อง (Printable Shift Poster)</h2>
              <p className="text-xs text-slate-400">สำหรับพิมพ์ติดบอร์ดศูนย์สั่งการหรือบันทึกเป็นเอกสารประจำวัน</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ใบเวร (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Canvas Container */}
        <div
          id="printable-shift-poster"
          className="mt-4 bg-white text-slate-900 rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xl print:m-0 print:p-0 print:border-none print:shadow-none font-['Prompt',sans-serif]"
        >
          {/* Header of the Official Board */}
          <div className="text-center pb-6 border-b-2 border-purple-900">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center text-white shadow-md">
                <Zap className="w-7 h-7 text-amber-400 fill-amber-400" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-900">การไฟฟ้าส่วนภูมิภาค (PEA)</div>
                <div className="text-2xl font-black text-slate-900">{shift.stationFullName}</div>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-purple-950 mt-1">
              ตารางรายชื่อผู้ปฏิบัติงานเข้าเวร แก้ไฟฟ้าขัดข้อง
            </h1>

            <div className="inline-flex flex-wrap items-center justify-center gap-4 mt-3 py-1.5 px-4 bg-purple-50 rounded-full border border-purple-200 text-sm font-semibold text-purple-950">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-800" />
                ประจำวัน {shift.dayOfWeek} ที่ {shift.dayNumber} เดือน {shift.month} พ.ศ. {shift.yearBE}
              </span>
              <span className="text-purple-300">|</span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <Clock className="w-4 h-4 text-amber-600" />
                เวลา {shift.timeRange}
              </span>
            </div>
          </div>

          {/* Section 1: E/O Dispatcher */}
          <div className="mt-6 p-4 rounded-xl bg-purple-50/80 border-2 border-purple-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-purple-900 text-amber-300 font-bold text-xs">
                ผู้ควบคุมและสั่งการเวร
              </span>
              <h2 className="text-base font-bold text-purple-950">
                พนักงานสั่งงานแก้กระแสไฟฟ้าขัดข้อง E/O
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-purple-200">
              <div>
                <span className="text-lg font-bold text-slate-900">{shift.eoOfficer.name}</span>
                <span className="ml-2 text-sm font-medium px-2 py-0.5 bg-white rounded border border-purple-300 text-purple-900 font-semibold">
                  {shift.eoOfficer.position}
                </span>
              </div>
              <div className="flex items-center gap-1 text-lg font-mono font-bold text-purple-950">
                <Phone className="w-4 h-4 text-purple-800" />
                <span>{shift.eoOfficer.phone}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Troubleshooters (Linemen) */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-slate-800 text-white font-bold text-xs">
                ทีมปฏิบัติการภาคสนาม
              </span>
              <h2 className="text-base font-bold text-slate-900">
                พนักงานแก้ไฟฟ้าขัดข้อง
              </h2>
            </div>

            <div className="space-y-3">
              {shift.troubleshooters.map((ts, idx) => (
                <div
                  key={ts.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-slate-300 bg-slate-50 gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-base">{ts.name}</div>
                      <div className="text-xs text-slate-600 font-medium">
                        ตำแหน่ง: {ts.position}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono font-bold text-base text-slate-900">
                    <Phone className="w-4 h-4 text-purple-700" />
                    <span>{ts.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Substation Footer */}
          <div className="mt-8 pt-4 border-t-2 border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
            <div>
              <div className="font-bold text-slate-900 text-sm mb-1">ช่องทางติดต่อฉุกเฉิน กฟส.ฝาง:</div>
              <div>☎️ เบอร์โทรศัพท์สำนักงาน: <strong className="text-slate-900 font-mono text-sm">{shift.mainPhone}</strong></div>
              <div>📞 PEA Contact Center 24 ชั่วโมง: <strong className="text-purple-900 font-mono text-sm">{shift.peaCallCenter}</strong></div>
              <div>📍 ที่ตั้งสำนักงาน: 343 ม.4 ต.เวียง อ.ฝาง จ.เชียงใหม่ 50110</div>
              <div className="mt-2 pt-2 border-t border-slate-200 flex items-center gap-1.5 text-purple-900 font-semibold">
                <Globe className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
                <span>ระบบตารางเวรออนไลน์: </span>
                <a
                  href="https://champcktech.github.io/EO/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-700 underline font-mono text-[11px]"
                >
                  https://champcktech.github.io/EO/
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-end text-right sm:items-end">
              <div className="mt-4 pt-8 border-t border-slate-400 w-48 text-center">
                <div className="font-semibold text-slate-900">{shift.eoOfficer.name}</div>
                <div className="text-[11px] text-slate-600">ผู้สั่งงานเวรประจำวัน</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
