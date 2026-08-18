import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, PhoneCall, Clock, Calendar, Radio, MapPin } from 'lucide-react';
import { ShiftInfo } from '../types';

interface HeaderProps {
  shift: ShiftInfo;
  onOpenLineModal: () => void;
  onOpenPrintModal: () => void;
  onOpenEditModal: () => void;
  onOpenNewIncidentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  shift,
  onOpenLineModal,
  onOpenPrintModal,
  onOpenEditModal,
  onOpenNewIncidentModal
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isShiftActive, setIsShiftActive] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 border-b border-purple-800/40 text-white pb-6 pt-4 px-4 sm:px-6 lg:px-8 shadow-2xl">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top Emergency Hotlines Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-800/30 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-purple-200">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-emerald-400">ระบบเวรปฏิบัติการแบบเรียลไทม์</span>
            <span className="text-purple-400/60 hidden sm:inline">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {shift.location}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              id="header-call-station"
              href={`tel:${shift.mainPhone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/30 rounded-full text-purple-200 hover:text-white transition shadow-sm font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>เบอร์สำนักงาน: <strong>{shift.mainPhone}</strong></span>
            </a>
            <a
              id="header-call-1129"
              href={`tel:${shift.peaCallCenter}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full font-bold transition shadow-sm"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-slate-950" />
              <span>สายด่วน <strong>{shift.peaCallCenter}</strong></span>
            </a>
          </div>
        </div>

        {/* Main Title & Shift Info Banner */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3.5 mb-2">
              {/* PEA Stylized Logo Badge */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 to-purple-500 p-0.5 shadow-lg shadow-purple-900/50 flex-shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-purple-600/20" />
                  <Zap className="w-7 h-7 text-amber-400 fill-amber-400 relative z-10" />
                  <span className="text-[9px] font-black tracking-tighter text-purple-200 relative z-10">PEA</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-purple-900/80 text-purple-200 border border-purple-600/40">
                    การไฟฟ้าส่วนภูมิภาค
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {shift.stationName} ฝาง
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                    <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                    พร้อมรับแจ้งเหตุ 24 ชม.
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                  ตารางเวรแก้ไฟฟ้าขัดข้อง {shift.stationName}
                </h1>
              </div>
            </div>

            {/* Date & Shift Schedule Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-sm text-slate-300">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>
                  ประจำวัน<strong>{shift.dayOfWeek}</strong> ที่ <strong>{shift.dayNumber}</strong> เดือน <strong>{shift.month}</strong> พ.ศ. <strong>{shift.yearBE}</strong>
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>
                  เวลาปฏิบัติงาน: <strong className="text-amber-300 font-bold">{shift.timeRange}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Status Card & Digital Clock */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
            <div className="w-full sm:w-auto lg:w-full bg-slate-950/80 border border-purple-500/30 rounded-xl p-3.5 shadow-inner flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">เวลาปัจจุบัน</div>
                <div className="text-2xl font-mono font-bold text-amber-400 tracking-wider">
                  {currentTime || '16:30:00'} <span className="text-xs font-normal text-slate-400">น.</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/50">
                  {shift.shiftName}
                </span>
                <div className="text-[11px] text-slate-400 mt-1">กฟส.ฝาง</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
