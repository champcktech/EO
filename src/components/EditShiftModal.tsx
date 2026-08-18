import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  User,
  Phone,
  Briefcase,
  Calendar,
  Clock,
  UserCheck,
  Layers,
  ChevronDown
} from 'lucide-react';
import { ShiftInfo, DutyOfficer, PersonnelMember, ShiftPreset } from '../types';
import { INITIAL_SHIFT_DATA, DEFAULT_SHIFT_PRESETS } from '../data/initialData';

interface EditShiftModalProps {
  shift: ShiftInfo;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedShift: ShiftInfo) => void;
  personnelList: PersonnelMember[];
}

export const EditShiftModal: React.FC<EditShiftModalProps> = ({
  shift,
  isOpen,
  onClose,
  onSave,
  personnelList
}) => {
  const [formData, setFormData] = useState<ShiftInfo>(JSON.parse(JSON.stringify(shift)));
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');

  if (!isOpen) return null;

  const handleEOChange = (field: keyof DutyOfficer, value: string) => {
    setFormData((prev) => ({
      ...prev,
      eoOfficer: {
        ...prev.eoOfficer,
        [field]: value,
        rawPhone: field === 'phone' ? value.replace(/[^0-9]/g, '') : prev.eoOfficer.rawPhone
      }
    }));
  };

  const handleSelectEOFromDirectory = (memberId: string) => {
    const member = personnelList.find((m) => m.id === memberId);
    if (!member) return;
    setFormData((prev) => ({
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

  const handleTSChange = (index: number, field: keyof DutyOfficer, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.troubleshooters];
      updated[index] = {
        ...updated[index],
        [field]: value,
        rawPhone: field === 'phone' ? value.replace(/[^0-9]/g, '') : updated[index].rawPhone
      };
      return {
        ...prev,
        troubleshooters: updated
      };
    });
  };

  const handleSelectTSFromDirectory = (index: number, memberId: string) => {
    const member = personnelList.find((m) => m.id === memberId);
    if (!member) return;
    setFormData((prev) => {
      const updated = [...prev.troubleshooters];
      updated[index] = {
        ...updated[index],
        name: member.name,
        position: member.position,
        positionFull: member.positionFull,
        phone: member.phone,
        rawPhone: member.phone.replace(/[^0-9]/g, '')
      };
      return {
        ...prev,
        troubleshooters: updated
      };
    });
  };

  const handleAddTroubleshooter = (prefillMember?: PersonnelMember) => {
    const newOfficer: DutyOfficer = {
      id: `ts-${Date.now()}`,
      name: prefillMember ? prefillMember.name : '',
      position: prefillMember ? prefillMember.position : 'ชชง.',
      positionFull: prefillMember ? prefillMember.positionFull : 'ช่างชำนาญการ',
      roleCategory: 'troubleshooter',
      roleTitle: 'พนักงานแก้ไฟฟ้าขัดข้อง',
      phone: prefillMember ? prefillMember.phone : '',
      rawPhone: prefillMember ? prefillMember.phone.replace(/[^0-9]/g, '') : '',
      status: 'on_duty'
    };

    setFormData((prev) => ({
      ...prev,
      troubleshooters: [...prev.troubleshooters, newOfficer]
    }));
  };

  const handleRemoveTroubleshooter = (index: number) => {
    if (formData.troubleshooters.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      troubleshooters: prev.troubleshooters.filter((_, i) => i !== index)
    }));
  };

  const handleApplyPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = DEFAULT_SHIFT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    // Find or create EO
    const eoMember = personnelList.find((m) => m.name.includes(preset.eoOfficerName)) || {
      name: preset.eoOfficerName,
      position: 'พชง.',
      positionFull: 'พนักงานช่าง',
      phone: '082-9364817'
    };

    // Find troubleshooters
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

    setFormData((prev) => ({
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

  const handleResetToDefault = () => {
    setFormData(JSON.parse(JSON.stringify(INITIAL_SHIFT_DATA)));
    setSelectedPresetId('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl text-slate-100 my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-900/60 text-purple-300 border border-purple-600/40">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">แก้ไขข้อมูลเวร & รายชื่อผู้ปฏิบัติงาน</h2>
              <p className="text-xs text-slate-400">เลือกจากทำเนียบรายชื่อพนักงาน หรือกรอกข้อมูลด้วยตนเอง</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Shift Presets Bar */}
        <div className="my-3 p-3 bg-purple-950/30 border border-purple-800/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-purple-200">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">โหลดจากชุดเวรสำเร็จรูป:</span>
          </div>

          <select
            value={selectedPresetId}
            onChange={(e) => handleApplyPreset(e.target.value)}
            className="w-full sm:w-auto bg-slate-950 border border-purple-700/60 rounded-lg px-3 py-1.5 text-xs text-purple-300 font-medium focus:outline-none"
          >
            <option value="">-- เลือกชุดเวรสำเร็จรูป --</option>
            {DEFAULT_SHIFT_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto my-2 space-y-5 pr-1">
          {/* Shift Schedule Info */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              ข้อมูลวันและเวลาเข้าเวร
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <label className="block text-xs text-slate-400 mb-1">วันในสัปดาห์</label>
                <input
                  type="text"
                  value={formData.dayOfWeek}
                  onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="เช่น อังคาร"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">วันที่</label>
                <input
                  type="number"
                  value={formData.dayNumber}
                  onChange={(e) => setFormData({ ...formData, dayNumber: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-purple-500 focus:outline-none"
                  min={1}
                  max={31}
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">เดือน</label>
                <input
                  type="text"
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">ปี พ.ศ.</label>
                <input
                  type="number"
                  value={formData.yearBE}
                  onChange={(e) => setFormData({ ...formData, yearBE: parseInt(e.target.value) || 2569 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">เวลาปฏิบัติหน้าที่ / กะเวร</label>
                <input
                  type="text"
                  value={formData.timeRange}
                  onChange={(e) => setFormData({ ...formData, timeRange: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-purple-500 focus:outline-none font-mono"
                  placeholder="เช่น 00.30 - 08.30 น."
                  required
                />
                {/* Quick Shift buttons */}
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeRange: '00.30 - 08.30 น.', shiftName: 'กะ 1 (00.30 - 08.30 น.)' })}
                    className="px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-purple-900/60 text-purple-300 border border-slate-700 transition"
                  >
                    กะ 1 (00.30-08.30)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeRange: '08.30 - 16.30 น.', shiftName: 'กะ 2 (08.30 - 16.30 น.)' })}
                    className="px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-purple-900/60 text-purple-300 border border-slate-700 transition"
                  >
                    กะ 2 (08.30-16.30)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, timeRange: '16.30 - 00.30 น.', shiftName: 'กะ 3 (16.30 - 00.30 น.)' })}
                    className="px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-purple-900/60 text-purple-300 border border-slate-700 transition"
                  >
                    กะ 3 (16.30-00.30)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">เบอร์สำนักงานหลัก (กฟส.ฝาง)</label>
                <input
                  type="text"
                  value={formData.mainPhone}
                  onChange={(e) => setFormData({ ...formData, mainPhone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-purple-500 focus:outline-none font-mono"
                  placeholder="053-453539"
                  required
                />
                <div className="text-[11px] text-slate-400 mt-1.5">
                  ที่ตั้ง สนง: 343 ม.4 ต.เวียง อ.ฝาง จ.เชียงใหม่
                </div>
              </div>
            </div>
          </div>

          {/* Section: E/O Officer with Quick Directory Dropdown */}
          <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-800/50 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-purple-200 flex items-center gap-1.5">
                <User className="w-4 h-4 text-purple-400" />
                พนักงานสั่งงานแก้กระแสไฟฟ้าขัดข้อง E/O
              </h3>

              {/* Quick Directory Selector for EO (4 officers only) */}
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                <select
                  onChange={(e) => {
                    if (e.target.value) handleSelectEOFromDirectory(e.target.value);
                  }}
                  defaultValue=""
                  className="bg-slate-950 border border-purple-700/60 rounded px-2.5 py-1 text-xs text-purple-300 focus:outline-none font-medium"
                >
                  <option value="">-- เลือกผู้สั่งการ E/O 4 นาย --</option>
                  {personnelList
                    .filter(
                      (m) =>
                        m.defaultRole === 'eo' ||
                        m.name.includes('กอบชัย') ||
                        m.name.includes('กฤตพัส') ||
                        m.name.includes('วัฒนพงศ์') ||
                        m.name.includes('ณัฐพงค์')
                    )
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} {m.position} {m.phone}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-sm">
              <div className="sm:col-span-6">
                <label className="block text-xs text-slate-400 mb-1">ชื่อ - สกุล</label>
                <input
                  type="text"
                  value={formData.eoOfficer.name}
                  onChange={(e) => handleEOChange('name', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="นาย..."
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-slate-400 mb-1">ตำแหน่ง</label>
                <input
                  type="text"
                  value={formData.eoOfficer.position}
                  onChange={(e) => handleEOChange('position', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="พชง."
                  required
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs text-slate-400 mb-1">เบอร์โทรศัพท์ติดต่อ</label>
                <input
                  type="text"
                  value={formData.eoOfficer.phone}
                  onChange={(e) => handleEOChange('phone', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-amber-300 font-mono focus:border-purple-500 focus:outline-none"
                  placeholder="08x-xxxxxxx"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Troubleshooter Team with Separated พชง. and ชชง. Directory Selectors */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-amber-400" />
                รายชื่อพนักงานแก้ไฟฟ้าขัดข้อง
              </h3>

              {/* Quick Add Separated for พชง and ชชง */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Select & Add พชง */}
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      const member = personnelList.find((m) => m.id === e.target.value);
                      if (member) handleAddTroubleshooter(member);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  className="bg-slate-900 border border-blue-600/50 hover:border-blue-500 rounded-lg px-2.5 py-1 text-xs text-blue-300 focus:outline-none font-medium"
                >
                  <option value="">⚡ + เพิ่ม พชง. ...</option>
                  {personnelList
                    .filter((m) => m.position.includes('พชง') && m.defaultRole !== 'eo')
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} {m.phone}
                      </option>
                    ))}
                </select>

                {/* Select & Add ชชง */}
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      const member = personnelList.find((m) => m.id === e.target.value);
                      if (member) handleAddTroubleshooter(member);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  className="bg-slate-900 border border-amber-600/50 hover:border-amber-500 rounded-lg px-2.5 py-1 text-xs text-amber-300 focus:outline-none font-medium"
                >
                  <option value="">🛠️ + เพิ่ม ชชง. ...</option>
                  {personnelList
                    .filter((m) => m.position.includes('ชชง'))
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} {m.phone}
                      </option>
                    ))}
                </select>

                <button
                  type="button"
                  onClick={() => handleAddTroubleshooter()}
                  className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มว่าง</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {formData.troubleshooters.map((ts, index) => (
                <div
                  key={ts.id || index}
                  className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-2"
                >
                  {/* Row Header with separated พชง and ชชง quick-picks */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pb-1.5 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-900/80 text-purple-300 text-[11px] font-mono font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-slate-300 font-semibold">ช่างคนที่ {index + 1}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* ช่องเลือก พชง */}
                      <select
                        onChange={(e) => {
                          if (e.target.value) handleSelectTSFromDirectory(index, e.target.value);
                          e.target.value = '';
                        }}
                        defaultValue=""
                        className="bg-slate-950 border border-blue-500/40 hover:border-blue-400 rounded px-2 py-0.5 text-[11px] text-blue-300 focus:outline-none"
                      >
                        <option value="">⚡ ช่องเลือก พชง. ▾</option>
                        {personnelList
                          .filter((m) => m.position.includes('พชง') && m.defaultRole !== 'eo')
                          .map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} {m.phone}
                            </option>
                          ))}
                      </select>

                      {/* ช่องเลือก ชชง */}
                      <select
                        onChange={(e) => {
                          if (e.target.value) handleSelectTSFromDirectory(index, e.target.value);
                          e.target.value = '';
                        }}
                        defaultValue=""
                        className="bg-slate-950 border border-amber-500/40 hover:border-amber-400 rounded px-2 py-0.5 text-[11px] text-amber-300 focus:outline-none"
                      >
                        <option value="">🛠️ ช่องเลือก ชชง. ▾</option>
                        {personnelList
                          .filter((m) => m.position.includes('ชชง'))
                          .map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} {m.phone}
                            </option>
                          ))}
                      </select>

                      {formData.troubleshooters.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTroubleshooter(index)}
                          className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition cursor-pointer ml-1"
                          title="ลบรายการนี้"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs sm:text-sm">
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        value={ts.name}
                        onChange={(e) => handleTSChange(index, 'name', e.target.value)}
                        placeholder="ชื่อ-นามสกุล"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:border-purple-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={ts.position}
                        onChange={(e) => handleTSChange(index, 'position', e.target.value)}
                        placeholder="ตำแหน่ง"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-white focus:border-purple-500 focus:outline-none font-semibold text-center"
                        required
                      />
                    </div>

                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        value={ts.phone}
                        onChange={(e) => handleTSChange(index, 'phone', e.target.value)}
                        placeholder="เบอร์โทรศัพท์"
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-amber-300 font-mono focus:border-purple-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3 py-2 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>คืนค่าเวร 18 ส.ค.</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl transition cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-900/40 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>บันทึกข้อมูล</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
