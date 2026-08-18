import React from 'react';
import { MapPin, PhoneCall, ShieldAlert, Building2, Radio, CheckCircle, Navigation } from 'lucide-react';
import { ShiftInfo } from '../types';
import { FANG_SUBDISTRICTS } from '../data/initialData';

interface FangSubstationInfoProps {
  shift: ShiftInfo;
}

export const FangSubstationInfo: React.FC<FangSubstationInfoProps> = ({ shift }) => {
  return (
    <div className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Office Details */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-900/60 text-purple-300 border border-purple-600/40">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                การไฟฟ้าส่วนภูมิภาค สาขาฝาง ({shift.stationName})
              </h3>
              <p className="text-xs text-slate-400">Provincial Electricity Authority (PEA) Fang District Office</p>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>ที่ตั้งสำนักงาน: <strong>343 ม.4</strong> ต.เวียง อ.ฝาง จ.เชียงใหม่ 50110</span>
            </div>

            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>โทรศัพท์ศูนย์ประสานงานแก้ไฟ: <strong>{shift.mainPhone}</strong> (ตรงถึงศูนย์เวร)</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>สายด่วน PEA Contact Center: <strong>{shift.peaCallCenter}</strong> (โทรฟรี 24 ชั่วโมง)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <a
              id="footer-call-office-btn"
              href={`tel:${shift.mainPhone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-semibold border border-purple-600/40 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>โทร 053-453539</span>
            </a>

            <a
              id="footer-call-1129-btn"
              href="tel:1129"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>โทร 1129 สายด่วน</span>
            </a>
          </div>
        </div>

        {/* Right: Coverage Subdistricts */}
        <div className="lg:col-span-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-purple-400 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5" />
                พื้นที่รับผิดชอบการจ่ายไฟ (อำเภอฝาง)
              </span>
              <span className="text-[11px] text-slate-400">ครอบคลุม 8 ตำบล</span>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              ทีมช่างเวร กฟส.ฝาง พร้อมเข้าเผชิญเหตุและกู้ระบบไฟฟ้าทุกตำบลในเขตพื้นที่
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FANG_SUBDISTRICTS.map((sd) => (
                <div
                  key={sd}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{sd}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>การไฟฟ้าส่วนภูมิภาค เขต 1 (ภาคเหนือ) จ.เชียงใหม่</span>
            <span className="text-purple-300 font-mono">PEA Fang v2.5</span>
          </div>
        </div>
      </div>
    </div>
  );
};
