import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  Zap,
  Plus,
  Filter,
  Check,
  ChevronDown,
  ChevronUp,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IncidentReport, ShiftInfo, IncidentStatus } from '../types';

interface IncidentManagerProps {
  incidents: IncidentReport[];
  shift: ShiftInfo;
  onUpdateStatus: (incidentId: string, status: IncidentStatus) => void;
  onOpenNewIncidentModal: () => void;
}

export const IncidentManager: React.FC<IncidentManagerProps> = ({
  incidents,
  shift,
  onUpdateStatus,
  onOpenNewIncidentModal
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredIncidents = incidents.filter((inc) => {
    if (filterStatus === 'all') return true;
    return inc.status === filterStatus;
  });

  const handleResolve = (id: string) => {
    onUpdateStatus(id, 'resolved');
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {
      // ignore
    }
  };

  const getSeverityBadge = (sev: IncidentReport['severity']) => {
    switch (sev) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">วิกฤต / เร่งด่วนมาก</span>;
      case 'urgent':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">ด่วน</span>;
      case 'normal':
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-700/50 text-slate-300 border border-slate-600">ปกติ</span>;
    }
  };

  const getStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            แก้ไขจ่ายไฟแล้ว
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5 animate-spin text-amber-400" />
            กำลังดำเนินการ
          </span>
        );
      case 'dispatched':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Zap className="w-3.5 h-3.5" />
            สั่งการทีมช่างแล้ว
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <AlertTriangle className="w-3.5 h-3.5" />
            รอดำเนินการ
          </span>
        );
    }
  };

  const activeCount = incidents.filter((i) => i.status !== 'resolved').length;
  const resolvedCount = incidents.filter((i) => i.status === 'resolved').length;

  return (
    <div id="incident-log-section" className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              สมุดรับแจ้งเหตุไฟฟ้าขัดข้องประจำกะ (Incident Log)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-900/80 text-purple-300 border border-purple-600/30">
              {incidents.length} รายการ
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            บันทึกรับแจ้งเหตุจากประชาชนในเขต อ.ฝาง และมอบหมายทีมช่างเวรเข้าแก้ไข
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewIncidentModal}
            className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>รับแจ้งเหตุใหม่</span>
          </button>
        </div>
      </div>

      {/* Summary stats & filter tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-slate-700 text-white border-slate-500 font-bold'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            ทั้งหมด ({incidents.length})
          </button>
          <button
            onClick={() => setFilterStatus('in_progress')}
            className={`px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              filterStatus === 'in_progress'
                ? 'bg-amber-950/80 text-amber-300 border-amber-500 font-bold'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            กำลังแก้ไข ({incidents.filter((i) => i.status === 'in_progress' || i.status === 'dispatched' || i.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilterStatus('resolved')}
            className={`px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              filterStatus === 'resolved'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500 font-bold'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            เสร็จสิ้นแล้ว ({resolvedCount})
          </button>
        </div>

        <div className="text-xs text-slate-400">
          ค้างดำเนินการ: <strong className="text-amber-400">{activeCount}</strong> รายการ
        </div>
      </div>

      {/* Incident List */}
      {filteredIncidents.length === 0 ? (
        <div className="text-center py-10 bg-slate-950/40 rounded-xl border border-slate-800/60 text-slate-400">
          <FileCheck className="w-10 h-10 mx-auto text-slate-600 mb-2" />
          <p className="text-sm">ไม่มีรายการแจ้งเหตุในสถานะนี้</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredIncidents.map((incident) => {
            const isExpanded = expandedId === incident.id;
            return (
              <div
                key={incident.id}
                className="bg-slate-950/70 border border-slate-800 hover:border-purple-800/50 rounded-xl p-4 transition text-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1 min-w-[240px]">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {getStatusBadge(incident.status)}
                      {getSeverityBadge(incident.severity)}
                      <span className="text-xs text-purple-300 font-medium px-2 py-0.5 bg-purple-950/60 rounded border border-purple-800/40">
                        {incident.subdistrict}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        ⏰ รับแจ้ง {incident.reportedTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mt-1">
                      {incident.outageType}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{incident.villageOrPlace}</span>
                      {incident.meterOrTransformerNo && (
                        <span className="text-slate-400">({incident.meterOrTransformerNo})</span>
                      )}
                    </p>
                  </div>

                  {/* Actions right */}
                  <div className="flex items-center gap-2 self-start">
                    {incident.status !== 'resolved' ? (
                      <button
                        onClick={() => handleResolve(incident.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow transition cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>ปิดงาน/จ่ายไฟแล้ว</span>
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        เสร็จสิ้น {incident.resolutionTime || ''}
                      </span>
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : incident.id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-2 bg-slate-900/50 p-3 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-400">ผู้แจ้งเหตุ: </span>
                        <strong className="text-white">{incident.callerName}</strong>
                        {incident.callerPhone && (
                          <a
                            href={`tel:${incident.callerPhone.replace(/[^0-9]/g, '')}`}
                            className="ml-2 text-amber-300 font-mono underline inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            {incident.callerPhone}
                          </a>
                        )}
                      </div>

                      <div>
                        <span className="text-slate-400">ช่างผู้รับผิดชอบ: </span>
                        <strong className="text-purple-300">{incident.assignedOfficerName || 'ยังไม่ได้ระบุ'}</strong>
                      </div>
                    </div>

                    {incident.description && (
                      <div>
                        <span className="text-slate-400">รายละเอียดอาการ: </span>
                        <span className="text-slate-200">{incident.description}</span>
                      </div>
                    )}

                    {incident.notes && (
                      <div className="text-emerald-300/90 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
                        <strong>บันทึกการแก้: </strong>
                        {incident.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
