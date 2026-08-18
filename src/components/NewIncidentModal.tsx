import React, { useState } from 'react';
import { X, AlertTriangle, MapPin, Phone, User, Zap, Save, UserCheck } from 'lucide-react';
import { IncidentReport, ShiftInfo, OutageSeverity, PersonnelMember } from '../types';
import { FANG_SUBDISTRICTS, OUTAGE_TYPES } from '../data/initialData';

interface NewIncidentModalProps {
  shift: ShiftInfo;
  isOpen: boolean;
  onClose: () => void;
  onAddIncident: (incident: IncidentReport) => void;
  personnelList?: PersonnelMember[];
}

export const NewIncidentModal: React.FC<NewIncidentModalProps> = ({
  shift,
  isOpen,
  onClose,
  onAddIncident,
  personnelList = []
}) => {
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [subdistrict, setSubdistrict] = useState(FANG_SUBDISTRICTS[0]);
  const [villageOrPlace, setVillageOrPlace] = useState('');
  const [meterOrTransformerNo, setMeterOrTransformerNo] = useState('');
  const [outageType, setOutageType] = useState(OUTAGE_TYPES[0]);
  const [severity, setSeverity] = useState<OutageSeverity>('normal');
  const [description, setDescription] = useState('');
  const [assignedOfficerName, setAssignedOfficerName] = useState(
    shift.troubleshooters[0] ? `${shift.troubleshooters[0].name} (${shift.troubleshooters[0].position})` : ''
  );
  const [assignedOfficerPhone, setAssignedOfficerPhone] = useState(
    shift.troubleshooters[0] ? shift.troubleshooters[0].phone : ''
  );

  if (!isOpen) return null;

  const handleOfficerSelectChange = (value: string) => {
    setAssignedOfficerName(value);

    // Try finding matching phone
    const matchedTS = shift.troubleshooters.find((ts) => value.includes(ts.name));
    if (matchedTS) {
      setAssignedOfficerPhone(matchedTS.phone);
      return;
    }

    const matchedPersonnel = personnelList.find((p) => value.includes(p.name));
    if (matchedPersonnel) {
      setAssignedOfficerPhone(matchedPersonnel.phone);
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';

    const newIncident: IncidentReport = {
      id: `inc-${Date.now()}`,
      callerName: callerName || 'ประชาชนในพื้นที่',
      callerPhone,
      subdistrict,
      villageOrPlace,
      meterOrTransformerNo: meterOrTransformerNo || undefined,
      outageType,
      severity,
      description,
      reportedTime: timeStr,
      assignedOfficerName,
      assignedOfficerPhone: assignedOfficerPhone || undefined,
      status: 'in_progress',
      notes: 'รับเรื่องและแจ้งทีมช่างเข้าตรวจสอบหน้างาน'
    };

    onAddIncident(newIncident);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-purple-600/40 rounded-2xl p-5 sm:p-6 shadow-2xl text-slate-100 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-900/80 text-purple-300 border border-purple-600/40">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">บันทึกรับแจ้งเหตุไฟฟ้าขัดข้อง (กฟส.ฝาง)</h2>
              <p className="text-xs text-slate-400">บันทึกข้อมูลและส่งต่องานให้ทีมช่างเวรเข้าแก้ไข</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="my-4 space-y-4 text-xs sm:text-sm">
          {/* Section: Caller */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">ชื่อผู้แจ้งเหตุ</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  placeholder="เช่น นายสมชาย ใจดี"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">เบอร์โทรศัพท์ผู้แจ้ง</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={callerPhone}
                  onChange={(e) => setCallerPhone(e.target.value)}
                  placeholder="08x-xxxxxxx"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-amber-300 font-mono focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">ตำบล (อ.ฝาง)</label>
              <select
                value={subdistrict}
                onChange={(e) => setSubdistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {FANG_SUBDISTRICTS.map((sd) => (
                  <option key={sd} value={sd}>
                    {sd}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1">หมู่บ้าน / สถานที่เกิดเหตุ / จุดสังเกต</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={villageOrPlace}
                  onChange={(e) => setVillageOrPlace(e.target.value)}
                  placeholder="เช่น ม.3 บ้านสันทราย ข้างวัดสันทราย"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section: Outage Type & Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">ประเภทเหตุขัดข้อง</label>
              <select
                value={outageType}
                onChange={(e) => setOutageType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {OUTAGE_TYPES.map((ot) => (
                  <option key={ot} value={ot}>
                    {ot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">ระดับความเร่งด่วน</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as OutageSeverity)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="normal">ปกติ (บ้านเรือนทั่วไป)</option>
                <option value="urgent">ด่วน (ดับเป็นบริเวณกว้าง/มีผลกระทบ)</option>
                <option value="critical">วิกฤต (หม้อแปลงระเบิด/เสาล้ม/อันตรายชีวิต)</option>
              </select>
            </div>
          </div>

          {/* Assign officer with options separated by category */}
          <div>
            <label className="block text-slate-400 mb-1 flex items-center justify-between">
              <span>มอบหมายทีมช่างเวรเข้าปฏิบัติงาน</span>
              <span className="text-[11px] text-purple-400">เลือกช่างเข้าแก้ไฟ</span>
            </label>
            <select
              value={assignedOfficerName}
              onChange={(e) => handleOfficerSelectChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-purple-300 font-semibold focus:border-purple-500 focus:outline-none"
            >
              <optgroup label="⚡ ช่างประจำเวรปัจจุบัน">
                {shift.troubleshooters.map((ts) => (
                  <option key={ts.id} value={`${ts.name} ${ts.position}`}>
                    {ts.name} {ts.position} {ts.phone}
                  </option>
                ))}
                <option value="ทีมเวรชุดใหญ่ รวมช่างทุกคน">ทีมเวรชุดใหญ่ รวมช่างทุกคน</option>
              </optgroup>

              {personnelList.filter((p) => p.position.includes('พชง') && p.defaultRole !== 'eo').length > 0 && (
                <optgroup label="⚡ ช่อง พชง. จากทำเนียบ">
                  {personnelList
                    .filter((p) => p.position.includes('พชง') && p.defaultRole !== 'eo')
                    .map((p) => (
                      <option key={p.id} value={`${p.name} ${p.position}`}>
                        {p.name} {p.position} {p.phone}
                      </option>
                    ))}
                </optgroup>
              )}

              {personnelList.filter((p) => p.position.includes('ชชง')).length > 0 && (
                <optgroup label="🛠️ ช่อง ชชง. จากทำเนียบ">
                  {personnelList
                    .filter((p) => p.position.includes('ชชง'))
                    .map((p) => (
                      <option key={p.id} value={`${p.name} ${p.position}`}>
                        {p.name} {p.position} {p.phone}
                      </option>
                    ))}
                </optgroup>
              )}

              {personnelList.filter((p) => p.defaultRole === 'eo').length > 0 && (
                <optgroup label="🛡️ ช่อง ผู้สั่งการ E/O จากทำเนียบ">
                  {personnelList
                    .filter((p) => p.defaultRole === 'eo')
                    .map((p) => (
                      <option key={p.id} value={`${p.name} ${p.position}`}>
                        {p.name} {p.position} {p.phone} E/O
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Details */}
          <div>
            <label className="block text-slate-400 mb-1">รายละเอียดเพิ่มเติม / จุดระบุหม้อแปลง (ถ้ามี)</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ระบุรายละเอียด เช่น มีเสียงระเบิดดัง 1 ครั้ง, กิ่งไม้หักทับสายไฟ..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              สถานะเริ่มต้น: <span className="text-amber-400 font-bold">กำลังดำเนินการ</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/40 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>บันทึกและสั่งการ</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
