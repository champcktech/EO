import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Zap,
  PhoneCall,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  Info,
  UserCheck,
  Plus
} from 'lucide-react';
import { Header } from './components/Header';
import { QuickActionStrip } from './components/QuickActionStrip';
import { EOCard } from './components/EOCard';
import { TroubleshooterCard } from './components/TroubleshooterCard';
import { LineShareModal } from './components/LineShareModal';
import { ShiftPosterModal } from './components/ShiftPosterModal';
import { EditShiftModal } from './components/EditShiftModal';
import { NewIncidentModal } from './components/NewIncidentModal';
import { IncidentManager } from './components/IncidentManager';
import { SafetyGuideModal } from './components/SafetyGuideModal';
import { FangSubstationInfo } from './components/FangSubstationInfo';
import { PersonnelDirectoryModal } from './components/PersonnelDirectoryModal';
import {
  ShiftInfo,
  IncidentReport,
  IncidentStatus,
  DutyOfficer,
  PersonnelMember,
  ShiftPreset
} from './types';
import {
  INITIAL_SHIFT_DATA,
  INITIAL_INCIDENTS,
  DEFAULT_PERSONNEL_DIRECTORY
} from './data/initialData';
import { formatLineMessage, copyTextToClipboard } from './utils/helpers';

export default function App() {
  // Load persistent shift data or initial
  const [shift, setShift] = useState<ShiftInfo>(() => {
    const saved = localStorage.getItem('pea_fang_shift_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved shift', e);
      }
    }
    return INITIAL_SHIFT_DATA;
  });

  // Load persistent incidents or initial
  const [incidents, setIncidents] = useState<IncidentReport[]>(() => {
    const saved = localStorage.getItem('pea_fang_incidents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved incidents', e);
      }
    }
    return INITIAL_INCIDENTS;
  });

  // Load persistent personnel directory or default with seamless sync and exact 4 E/O enforcement
  const [personnelList, setPersonnelList] = useState<PersonnelMember[]>(() => {
    const saved = localStorage.getItem('pea_fang_personnel_directory');
    const allowedEoNames = [
      'กอบชัย จิตต์มโน',
      'กฤตพัส ธรรมชัย',
      'วัฒนพงศ์ ชมภูคำ',
      'ณัฐพงค์ อินทร์ไชย'
    ];

    if (saved) {
      try {
        const parsed: PersonnelMember[] = JSON.parse(saved);
        // Merge missing default personnel into existing saved list
        const existingNames = new Set(parsed.map((p) => p.name.trim()));
        const missingDefaults = DEFAULT_PERSONNEL_DIRECTORY.filter(
          (def) => !existingNames.has(def.name.trim())
        );

        let combined = [...parsed, ...missingDefaults];

        // Ensure ONLY the 4 specified officers have defaultRole === 'eo'
        combined = combined.map((member) => {
          const isAllowedEo = allowedEoNames.some((eoName) => member.name.includes(eoName));
          if (isAllowedEo) {
            return { ...member, defaultRole: 'eo' as const, note: 'ผู้สั่งการ E/O' };
          } else if (member.defaultRole === 'eo' || member.defaultRole === 'both') {
            return { ...member, defaultRole: 'troubleshooter' as const, note: member.note?.includes('E/O') ? 'พนักงานช่าง' : member.note };
          }
          return member;
        });

        localStorage.setItem('pea_fang_personnel_directory', JSON.stringify(combined));
        return combined;
      } catch (e) {
        console.error('Failed to parse saved personnel directory', e);
      }
    }
    return DEFAULT_PERSONNEL_DIRECTORY;
  });

  // Modals state
  const [isLineModalOpen, setIsLineModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isDirectoryModalOpen, setIsDirectoryModalOpen] = useState(false);

  // Quick action feedback
  const [copiedQuick, setCopiedQuick] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('pea_fang_shift_data', JSON.stringify(shift));
  }, [shift]);

  useEffect(() => {
    localStorage.setItem('pea_fang_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('pea_fang_personnel_directory', JSON.stringify(personnelList));
  }, [personnelList]);

  const handleQuickCopyLine = async () => {
    const text = formatLineMessage(shift);
    const success = await copyTextToClipboard(text);
    if (success) {
      setCopiedQuick(true);
      setTimeout(() => setCopiedQuick(false), 2500);
    }
  };

  const handleSaveShift = (updatedShift: ShiftInfo) => {
    setShift(updatedShift);
  };

  const handleAddIncident = (newIncident: IncidentReport) => {
    setIncidents((prev) => [newIncident, ...prev]);
  };

  const handleUpdateIncidentStatus = (incidentId: string, status: IncidentStatus) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status,
            resolutionTime:
              status === 'resolved'
                ? new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.'
                : inc.resolutionTime
          };
        }
        return inc;
      })
    );
  };

  const handleUpdateOfficerStatus = (officerId: string, status: DutyOfficer['status']) => {
    if (officerId === shift.eoOfficer.id) {
      setShift((prev) => ({
        ...prev,
        eoOfficer: { ...prev.eoOfficer, status }
      }));
    } else {
      setShift((prev) => ({
        ...prev,
        troubleshooters: prev.troubleshooters.map((ts) =>
          ts.id === officerId ? { ...ts, status } : ts
        )
      }));
    }
  };

  // Direct assignment handlers from Directory
  const handleAssignEOFromDirectory = (member: PersonnelMember) => {
    setShift((prev) => ({
      ...prev,
      eoOfficer: {
        ...prev.eoOfficer,
        name: member.name,
        position: member.position,
        positionFull: member.positionFull,
        phone: member.phone,
        rawPhone: member.phone.replace(/[^0-9]/g, '')
      }
    }));
  };

  const handleAddTroubleshooterFromDirectory = (member: PersonnelMember) => {
    // Check if already in list
    const existing = shift.troubleshooters.find((ts) => ts.name.includes(member.name));
    if (existing) return;

    const newOfficer: DutyOfficer = {
      id: `ts-${Date.now()}`,
      name: member.name,
      position: member.position,
      positionFull: member.positionFull,
      roleCategory: 'troubleshooter',
      roleTitle: 'พนักงานแก้ไฟฟ้าขัดข้อง',
      phone: member.phone,
      rawPhone: member.phone.replace(/[^0-9]/g, ''),
      status: 'on_duty'
    };

    setShift((prev) => ({
      ...prev,
      troubleshooters: [...prev.troubleshooters, newOfficer]
    }));
  };

  const handleApplyPreset = (preset: ShiftPreset) => {
    // Find or fallback for EO
    const eoMember = personnelList.find((m) => m.name.includes(preset.eoOfficerName)) || {
      name: preset.eoOfficerName,
      position: 'พชง.',
      positionFull: 'พนักงานช่าง',
      phone: '082-9364817'
    };

    const tsOfficers: DutyOfficer[] = preset.troubleshootersNames.map((name, i) => {
      const found = personnelList.find((m) => m.name.includes(name));
      return {
        id: `ts-${Date.now()}-${i}`,
        name: found ? found.name : name,
        position: found ? found.position : 'ชชง.',
        positionFull: found ? found.positionFull : 'ช่างชำนาญการ',
        roleCategory: 'troubleshooter',
        roleTitle: 'พนักงานแก้ไฟฟ้าขัดข้อง',
        phone: found ? found.phone : '080-0000000',
        rawPhone: (found ? found.phone : '0800000000').replace(/[^0-9]/g, ''),
        status: 'on_duty'
      };
    });

    setShift((prev) => ({
      ...prev,
      timeRange: preset.timeRange,
      shiftName: preset.title,
      eoOfficer: {
        ...prev.eoOfficer,
        name: eoMember.name,
        position: eoMember.position,
        positionFull: eoMember.positionFull,
        phone: eoMember.phone,
        rawPhone: eoMember.phone.replace(/[^0-9]/g, '')
      },
      troubleshooters: tsOfficers
    }));
  };

  // Filter troubleshooters based on search
  const filteredTroubleshooters = shift.troubleshooters.filter((ts) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      ts.name.toLowerCase().includes(q) ||
      ts.phone.includes(q) ||
      ts.position.toLowerCase().includes(q)
    );
  });

  const activeIncidentsCount = incidents.filter((i) => i.status !== 'resolved').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Prompt',sans-serif]">
      {/* Official Header */}
      <Header
        shift={shift}
        onOpenLineModal={() => setIsLineModalOpen(true)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        onOpenEditModal={() => setIsEditModalOpen(true)}
        onOpenNewIncidentModal={() => setIsNewIncidentOpen(true)}
      />

      {/* Quick Action Navigation Strip */}
      <QuickActionStrip
        onOpenLineModal={() => setIsLineModalOpen(true)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        onOpenEditModal={() => setIsEditModalOpen(true)}
        onOpenDirectoryModal={() => setIsDirectoryModalOpen(true)}
        onOpenNewIncidentModal={() => setIsNewIncidentOpen(true)}
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onQuickCopyLine={handleQuickCopyLine}
        copied={copiedQuick}
        activeIncidentsCount={activeIncidentsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Section 1: E/O Dispatcher (Featured VIP Officer) */}
        <section aria-labelledby="eo-section-heading">
          <EOCard
            officer={shift.eoOfficer}
            stationName={shift.stationName}
            onStatusChange={(status) => handleUpdateOfficerStatus(shift.eoOfficer.id, status)}
          />
        </section>

        {/* Section 2: Troubleshooter Linemen Team */}
        <section aria-labelledby="troubleshooter-section-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-900/60 text-purple-300 border border-purple-600/30">
                <Users className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 id="troubleshooter-section-heading" className="text-xl sm:text-2xl font-bold text-white">
                  พนักงานแก้ไฟฟ้าขัดข้อง (Linemen)
                </h2>
                <p className="text-xs text-slate-400">
                  ทีมช่างสนามประจำเวร กฟส.ฝาง จำนวน {shift.troubleshooters.length} นาย พร้อมรถปฏิบัติการ
                </p>
              </div>
            </div>

            {/* Quick Actions for Roster */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsDirectoryModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-purple-950 text-purple-300 border border-purple-600/30 text-xs font-medium transition cursor-pointer"
                title="เลือกช่างจากทำเนียบรายชื่อ"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>เลือกรายชื่อ</span>
              </button>

              {/* Quick Search */}
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาชื่อ, เบอร์โทร..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 placeholder:text-slate-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Troubleshooter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredTroubleshooters.map((officer, index) => (
              <TroubleshooterCard
                key={officer.id || index}
                officer={officer}
                index={index}
                stationName={shift.stationName}
                onStatusChange={(id, status) => handleUpdateOfficerStatus(id, status)}
              />
            ))}
          </div>

          {filteredTroubleshooters.length === 0 && (
            <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
              <p className="text-sm">ไม่พบรายชื่อช่างที่ตรงกับคำค้นหา "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-purple-400 hover:text-purple-300 underline"
              >
                ล้างคำค้นหา
              </button>
            </div>
          )}
        </section>

        {/* Section 3: Live Incident Dispatch & Ticket Manager */}
        <section aria-labelledby="incidents-section-heading">
          <IncidentManager
            incidents={incidents}
            shift={shift}
            onUpdateStatus={handleUpdateIncidentStatus}
            onOpenNewIncidentModal={() => setIsNewIncidentOpen(true)}
          />
        </section>

        {/* Section 4: Fang Substation Info & Coverage Areas */}
        <section aria-labelledby="fang-info-heading">
          <FangSubstationInfo shift={shift} />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>การไฟฟ้าส่วนภูมิภาค สาขาฝาง (กฟส.ฝาง) | PEA Fang Emergency Dispatch</span>
          </div>

          <div className="flex items-center gap-3">
            <span>เบอร์ติดต่อ: {shift.mainPhone}</span>
            <span>•</span>
            <span className="text-purple-400 font-semibold">สายด่วน PEA 1129</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LineShareModal
        shift={shift}
        isOpen={isLineModalOpen}
        onClose={() => setIsLineModalOpen(false)}
      />

      <ShiftPosterModal
        shift={shift}
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />

      <EditShiftModal
        shift={shift}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveShift}
        personnelList={personnelList}
      />

      <PersonnelDirectoryModal
        isOpen={isDirectoryModalOpen}
        onClose={() => setIsDirectoryModalOpen(false)}
        shift={shift}
        onApplyPreset={handleApplyPreset}
        onAssignEO={handleAssignEOFromDirectory}
        onAddTroubleshooter={handleAddTroubleshooterFromDirectory}
        personnelList={personnelList}
        onUpdatePersonnelList={setPersonnelList}
      />

      <NewIncidentModal
        shift={shift}
        isOpen={isNewIncidentOpen}
        onClose={() => setIsNewIncidentOpen(false)}
        onAddIncident={handleAddIncident}
        personnelList={personnelList}
      />

      <SafetyGuideModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
        stationPhone={shift.mainPhone}
      />
    </div>
  );
}
