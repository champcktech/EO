import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Search,
  Plus,
  Trash2,
  Edit2,
  Phone,
  Briefcase,
  Shield,
  Zap,
  Check,
  UserPlus,
  Layers,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { PersonnelMember, ShiftPreset, ShiftInfo, DutyOfficer } from '../types';
import { DEFAULT_PERSONNEL_DIRECTORY, DEFAULT_SHIFT_PRESETS } from '../data/initialData';

interface PersonnelDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: ShiftInfo;
  onApplyPreset: (preset: ShiftPreset) => void;
  onAssignEO: (member: PersonnelMember) => void;
  onAddTroubleshooter: (member: PersonnelMember) => void;
  personnelList: PersonnelMember[];
  onUpdatePersonnelList: (list: PersonnelMember[]) => void;
}

export const PersonnelDirectoryModal: React.FC<PersonnelDirectoryModalProps> = ({
  isOpen,
  onClose,
  shift,
  onApplyPreset,
  onAssignEO,
  onAddTroubleshooter,
  personnelList,
  onUpdatePersonnelList
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'presets'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'pch' | 'chch' | 'eo'>('all');
  
  // New employee form state
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPosition, setNewPosition] = useState('ชชง.');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState<'eo' | 'troubleshooter' | 'both'>('troubleshooter');
  const [newDept, setNewDept] = useState('แผนกปฏิบัติการและบำรุงรักษา');
  const [newNote, setNewNote] = useState('');

  // Editing employee state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const pchCount = personnelList.filter((m) => m.position.includes('พชง') && m.defaultRole !== 'eo').length;
  const chchCount = personnelList.filter((m) => m.position.includes('ชชง')).length;
  const eoCount = personnelList.filter((m) => m.defaultRole === 'eo').length;

  const filteredList = personnelList.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.department && m.department.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (roleFilter === 'all') return true;
    if (roleFilter === 'eo') return m.defaultRole === 'eo';
    if (roleFilter === 'pch') return m.position.includes('พชง') && m.defaultRole !== 'eo';
    if (roleFilter === 'chch') return m.position.includes('ชชง');
    return true;
  });

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newMember: PersonnelMember = {
      id: `emp-${Date.now()}`,
      name: newName.trim(),
      position: newPosition.trim() || 'ชชง.',
      positionFull: newPosition.includes('พชง') ? 'พนักงานช่าง' : 'ช่างชำนาญการ',
      phone: newPhone.trim(),
      defaultRole: newRole,
      department: newDept,
      note: newNote
    };

    const updated = [...personnelList, newMember];
    onUpdatePersonnelList(updated);
    setIsAddingNew(false);
    setNewName('');
    setNewPhone('');
    setNewNote('');
    showToast(`เพิ่มรายชื่อ ${newMember.name} เรียบร้อยแล้ว`);
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (personnelList.length <= 1) return;
    const updated = personnelList.filter((m) => m.id !== id);
    onUpdatePersonnelList(updated);
    showToast(`ลบรายชื่อ ${name} แล้ว`);
  };

  const handleStartEdit = (member: PersonnelMember) => {
    setEditingId(member.id);
    setEditName(member.name);
    setEditPosition(member.position);
    setEditPhone(member.phone);
  };

  const handleSaveEdit = (id: string) => {
    const updated = personnelList.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          name: editName,
          position: editPosition,
          phone: editPhone
        };
      }
      return m;
    });
    onUpdatePersonnelList(updated);
    setEditingId(null);
    showToast('อัปเดตข้อมูลพนักงานเรียบร้อย');
  };

  const handleResetToDefault = () => {
    onUpdatePersonnelList(DEFAULT_PERSONNEL_DIRECTORY);
    showToast('คืนค่าทำเนียบรายชื่อเริ่มต้นแล้ว');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-100 my-auto max-h-[92vh] flex flex-col">
        
        {/* Toast notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-900/70 text-purple-300 border border-purple-600/40">
              <UserCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>ทำเนียบรายชื่อ & ตัวเลือกชุดเวร</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                  กฟส.ฝาง
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                เลือกพนักงานเข้าเวรประจำวัน หรือปรับใช้ชุดเวรสำเร็จรูปได้ทันที
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-4 sm:px-6 bg-slate-950/40">
          <button
            id="tab-directory"
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'directory'
                ? 'border-purple-500 text-purple-300 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>ทำเนียบรายชื่อพนักงาน ({personnelList.length})</span>
          </button>

          <button
            id="tab-presets"
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'presets'
                ? 'border-purple-500 text-purple-300 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>ชุดเวรสำเร็จรูป (3 ชุด)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'directory' ? (
            <>
              {/* Controls bar */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  {/* Search */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ค้นหาชื่อ, เบอร์โทร, ตำแหน่ง..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Add New Employee button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => setIsAddingNew(!isAddingNew)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-medium text-xs sm:text-sm shadow-md transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isAddingNew ? 'ปิดฟอร์ม' : 'เพิ่มรายชื่อใหม่'}</span>
                    </button>
                  </div>
                </div>

                {/* Category Selection Tabs/Pills: Separated Channels */}
                <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 px-2 font-medium">แยกช่องดู:</span>
                  
                  <button
                    type="button"
                    onClick={() => setRoleFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      roleFilter === 'all'
                        ? 'bg-slate-700 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span>ทั้งหมด</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[11px] text-slate-300">
                      {personnelList.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRoleFilter('pch')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      roleFilter === 'pch'
                        ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                        : 'text-blue-300 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/40'
                    }`}
                  >
                    <span>⚡ ช่อง พชง.</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-blue-900 text-[11px] text-blue-200">
                      {pchCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRoleFilter('chch')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      roleFilter === 'chch'
                        ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                        : 'text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/40'
                    }`}
                  >
                    <span>🛠️ ช่อง ชชง.</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-900 text-[11px] text-amber-200">
                      {chchCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRoleFilter('eo')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      roleFilter === 'eo'
                        ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400'
                        : 'text-purple-300 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-800/40'
                    }`}
                  >
                    <span>🛡️ ผู้สั่งการ E/O</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-purple-900 text-[11px] text-purple-200">
                      {eoCount}
                    </span>
                  </button>
                </div>
              </div>

              {/* Add New Employee Form */}
              {isAddingNew && (
                <form
                  onSubmit={handleCreateMember}
                  className="bg-slate-950/80 p-4 rounded-xl border border-purple-700/50 space-y-3 animate-in fade-in"
                >
                  <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-amber-400" />
                    <span>บันทึกพนักงานใหม่เข้าทำเนียบ กฟส.ฝาง</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs sm:text-sm">
                    <div className="sm:col-span-5">
                      <label className="block text-slate-400 mb-1">ชื่อ - นามสกุล *</label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="เช่น นายมานะ สว่างสุข"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-slate-400 mb-1">ตำแหน่งย่อ *</label>
                      <input
                        type="text"
                        value={newPosition}
                        onChange={(e) => setNewPosition(e.target.value)}
                        placeholder="ชชง. / พชง."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-slate-400 mb-1">เบอร์โทรศัพท์ *</label>
                      <input
                        type="text"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="08x-xxxxxxx"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-amber-300 font-mono focus:border-purple-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <label className="block text-slate-400 mb-1">หน้าที่หลัก</label>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="troubleshooter">พนักงานแก้ไฟฟ้าขัดข้อง (Lineman)</option>
                        <option value="eo">พนักงานสั่งงานแก้กระแสไฟฟ้าขัดข้อง (E/O)</option>
                        <option value="both">ปฏิบัติได้ทั้งสองหน้าที่</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">หมายเหตุ / ความเชี่ยวชาญ</label>
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="เช่น ช่างชุดกู้ระบบ, ฮอทไลน์..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold"
                    >
                      บันทึกเข้าทำเนียบ
                    </button>
                  </div>
                </form>
              )}

              {/* Directory Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredList.map((member) => {
                  const isCurrentEO = shift.eoOfficer.name.includes(member.name);
                  const isCurrentTS = shift.troubleshooters.some((ts) => ts.name.includes(member.name));

                  return (
                    <div
                      key={member.id}
                      className={`p-3.5 rounded-xl border transition flex flex-col justify-between gap-3 ${
                        isCurrentEO
                          ? 'bg-purple-950/40 border-purple-600/70 shadow-sm'
                          : isCurrentTS
                          ? 'bg-slate-900 border-amber-500/50'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {editingId === member.id ? (
                        <div className="space-y-2 text-xs">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editPosition}
                              onChange={(e) => setEditPosition(e.target.value)}
                              className="w-24 bg-slate-950 border border-slate-700 rounded p-1.5 text-white"
                              placeholder="ตำแหน่ง"
                            />
                            <input
                              type="text"
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="flex-1 bg-slate-950 border border-slate-700 rounded p-1.5 text-amber-300 font-mono"
                              placeholder="เบอร์โทร"
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs"
                            >
                              ยกเลิก
                            </button>
                            <button
                              onClick={() => handleSaveEdit(member.id)}
                              className="px-3 py-1 bg-purple-600 text-white rounded text-xs font-bold"
                            >
                              บันทึก
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm sm:text-base">
                                  {member.name}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 font-mono text-xs font-semibold">
                                  {member.position}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-mono text-amber-300">
                                <Phone className="w-3.5 h-3.5 text-amber-400" />
                                {member.phone}
                              </p>
                              {member.note && (
                                <p className="text-[11px] text-slate-400 mt-1 italic">
                                  • {member.note}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleStartEdit(member)}
                                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition cursor-pointer"
                                title="แก้ไขข้อมูล"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id, member.name)}
                                className="p-1 text-rose-400/80 hover:text-rose-300 rounded hover:bg-rose-950/40 transition cursor-pointer"
                                title="ลบรายชื่อ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Shift status badge */}
                          <div className="mt-2 flex items-center gap-1.5">
                            {isCurrentEO && (
                              <span className="px-2 py-0.5 rounded-full text-[11px] bg-purple-900 text-purple-200 border border-purple-600/50 font-medium flex items-center gap-1">
                                <Shield className="w-3 h-3 text-purple-300" />
                                ปฏิบัติหน้าที่ E/O ในเวรปัจจุบัน
                              </span>
                            )}
                            {isCurrentTS && (
                              <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-950/80 text-amber-300 border border-amber-600/50 font-medium flex items-center gap-1">
                                <Zap className="w-3 h-3 text-amber-400" />
                                เป็นช่างแก้ไฟในเวรปัจจุบัน
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Quick assignment buttons */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-400">จัดเข้าเวร:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              onAssignEO(member);
                              showToast(`ตั้ง ${member.name} เป็น E/O ผู้สั่งการแล้ว`);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 cursor-pointer ${
                              isCurrentEO
                                ? 'bg-purple-800 text-white'
                                : 'bg-slate-800 hover:bg-purple-900/60 text-purple-300 hover:text-white'
                            }`}
                            title="ตั้งเป็นพนักงานสั่งการ E/O"
                          >
                            <Shield className="w-3 h-3" />
                            <span>ตั้งเป็น E/O</span>
                          </button>

                          <button
                            onClick={() => {
                              onAddTroubleshooter(member);
                              showToast(`เพิ่ม ${member.name} เข้าทีมช่างแก้ไฟแล้ว`);
                            }}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-amber-900/60 text-amber-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
                            title="เพิ่มเข้าทีมช่างแก้ไฟฟ้าขัดข้อง"
                          >
                            <Plus className="w-3 h-3" />
                            <span>เพิ่มในทีมช่าง</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredList.length === 0 && (
                <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800 text-slate-400">
                  <p className="text-sm">ไม่พบรายชื่อพนักงานที่ตรงกับเงื่อนไข</p>
                </div>
              )}
            </>
          ) : (
            /* Presets Tab */
            <div className="space-y-4">
              <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-800/40 text-xs text-purple-200">
                💡 <span className="font-semibold">ชุดเวรสำเร็จรูป:</span> คลิก "ปรับใช้ชุดเวรนี้" เพื่อแทนที่รายชื่อผู้สั่งการ E/O และทีมช่างทั้งหมดในเวรปัจจุบันโดยอัตโนมัติ
              </div>

              <div className="grid grid-cols-1 gap-4">
                {DEFAULT_SHIFT_PRESETS.map((preset, idx) => (
                  <div
                    key={preset.id}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-purple-600/50 transition flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-900 text-purple-300 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-white text-sm sm:text-base">
                          {preset.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400">{preset.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block text-[11px]">ผู้สั่งการ E/O:</span>
                          <span className="text-purple-300 font-bold">{preset.eoOfficerName}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 block text-[11px]">ทีมช่างแก้ไฟ ({preset.troubleshootersNames.length} นาย):</span>
                          <span className="text-amber-300 font-medium">{preset.troubleshootersNames.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col justify-end gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          onApplyPreset(preset);
                          showToast(`ปรับใช้ ${preset.title} เรียบร้อยแล้ว`);
                        }}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <span>ปรับใช้ชุดเวรนี้</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-950/40">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>คืนค่าทำเนียบเริ่มต้น</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium rounded-xl transition cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
