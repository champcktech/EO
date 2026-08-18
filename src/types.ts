export interface DutyOfficer {
  id: string;
  name: string;
  position: string; // e.g. 'พชง.', 'ชชง.'
  positionFull: string; // e.g. 'พนักงานช่าง', 'ช่างชำนาญการ'
  roleCategory: 'eo' | 'troubleshooter';
  roleTitle: string; // e.g. 'พนักงานสั่งงานแก้กระแสไฟฟ้าขัดข้อง (E/O)' | 'พนักงานแก้ไฟฟ้าขัดข้อง'
  phone: string;
  rawPhone: string; // sanitized for tel: href
  avatar?: string;
  badgeNumber?: string;
  vehiclePlate?: string;
  status: 'available' | 'on_duty' | 'dispatched' | 'break';
  isLead?: boolean;
}

export interface PersonnelMember {
  id: string;
  name: string;
  position: string;
  positionFull: string;
  phone: string;
  defaultRole: 'eo' | 'troubleshooter' | 'both';
  department?: string;
  note?: string;
}

export interface ShiftPreset {
  id: string;
  title: string;
  timeRange: string;
  description: string;
  eoOfficerName: string;
  troubleshootersNames: string[];
}

export interface ShiftInfo {
  id: string;
  stationName: string; // กฟส.ฝาง (การไฟฟ้าส่วนภูมิภาค สาขาฝาง)
  stationFullName: string;
  dayOfWeek: string; // อังคาร
  dayNumber: number; // 18
  month: string; // สิงหาคม
  yearBE: number; // 2569
  timeRange: string; // 16.30- 00.30 น.
  shiftName: string; // กะบ่าย-ดึก
  mainPhone: string; // 053-453539
  peaCallCenter: string; // 1129
  location: string; // อำเภอฝาง จังหวัดเชียงใหม่
  eoOfficer: DutyOfficer;
  troubleshooters: DutyOfficer[];
  note?: string;
  updatedAt: string;
}

export type OutageSeverity = 'normal' | 'urgent' | 'critical';
export type IncidentStatus = 'pending' | 'dispatched' | 'in_progress' | 'resolved';

export interface IncidentReport {
  id: string;
  callerName: string;
  callerPhone: string;
  subdistrict: string;
  villageOrPlace: string;
  meterOrTransformerNo?: string;
  outageType: string;
  severity: OutageSeverity;
  description: string;
  reportedTime: string;
  assignedOfficerName?: string;
  assignedOfficerPhone?: string;
  status: IncidentStatus;
  resolutionTime?: string;
  notes?: string;
}
