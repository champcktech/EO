import { ShiftInfo, IncidentReport, PersonnelMember, ShiftPreset } from '../types';

export const DEFAULT_PERSONNEL_DIRECTORY: PersonnelMember[] = [
  // --- กลุ่มผู้สั่งการ E/O เฉพาะ 4 นาย (Dispatchers) ---
  {
    id: 'emp-eo-1',
    name: 'นายกอบชัย จิตต์มโน',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '098-8856065',
    defaultRole: 'eo',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ผู้สั่งการ E/O'
  },
  {
    id: 'emp-eo-2',
    name: 'นายกฤตพัส ธรรมชัย',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '087-1833406',
    defaultRole: 'eo',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ผู้สั่งการ E/O'
  },
  {
    id: 'emp-eo-3',
    name: 'ว่าที่ ร.ต.วัฒนพงศ์ ชมภูคำ',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '080-1344135',
    defaultRole: 'eo',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ผู้สั่งการ E/O'
  },
  {
    id: 'emp-eo-4',
    name: 'นายณัฐพงค์ อินทร์ไชย',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '082-9364817',
    defaultRole: 'eo',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ผู้สั่งการ E/O'
  },

  // --- พนักงานช่าง (พชง.) ---
  {
    id: 'emp-tech-1',
    name: 'นายสุจินต์ ไชยมูล',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '090-3263954',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-2',
    name: 'นายเจษฎา จอมนำ',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '086-436755',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-3',
    name: 'นายกิตติชัย ใจนวล',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '080-0867731',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-4',
    name: 'นายนิติพงษ์ การแข็ง',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '090-4708480',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-5',
    name: 'นายนรินทร์ จริยา',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '082-8893620',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-6',
    name: 'นายกฤษณ์ชัย จันทรา',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '089-5764426',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-7',
    name: 'นายปิยะพงศ์ ยากยืน',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '095-4510531',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-8',
    name: 'นายธนพล มณีกุล',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '088-9455399',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-9',
    name: 'นายประสาน เป๋าคำ',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '089-9999152',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-10',
    name: 'นายกิตติพัทธ์ เรือนชัย',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '081-4686094',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-11',
    name: 'นายนพดล ปัญญา',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '084-5678901',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่างแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-tech-12',
    name: 'นายศุภชัย มั่นคง',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '087-3456789',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'พนักงานช่าง'
  },
  {
    id: 'emp-tech-13',
    name: 'นายสมศักดิ์ สุริยะ',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    phone: '086-1234567',
    defaultRole: 'troubleshooter',
    department: 'แผนกบริการลูกค้าและปฏิบัติการระบบไฟฟ้า',
    note: 'พนักงานช่าง'
  },

  // --- ช่างชำนาญการ (ชชง.) ---
  {
    id: 'emp-exp-1',
    name: 'นายจักรวาล เกตุเกษี',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '095-0932308',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-2',
    name: 'นายรัชกร คุณลอย',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '061-8034488',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-3',
    name: 'นายสุรินทร์ พันธุพิน',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '097-9947328',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-4',
    name: 'นายศรัณยู บุญเลา',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '099-934016',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-5',
    name: 'นายวิษณุ ดาระวัลย์',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '091-8598614',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-6',
    name: 'นายปรมินทร์ พงค์พันธ์',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '081-0315638',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-7',
    name: 'นายเกรียงศักดิ์ วราโพธิ์',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '083-8615710',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-8',
    name: 'นายอานนท์ เจริญพันธ์สวัสดิ์',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '087-1798739',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-9',
    name: 'นายสมคิด ยอดคำ',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '092-7530905',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-10',
    name: 'นายชัยสิทธิ์ กุดแก้ว',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '086-1158595',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-11',
    name: 'นายทนงศักดิ์ ทองศรี',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '080-9068696',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-12',
    name: 'นายภาสกร ปันใจ',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '080-8585876',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการแก้ไฟฟ้าขัดข้อง'
  },
  {
    id: 'emp-exp-13',
    name: 'นายวิโรจน์ สมบูรณ์',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '089-5521234',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการ'
  },
  {
    id: 'emp-exp-14',
    name: 'นายธีรภัทร ชัยวงค์',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '081-9876543',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการ'
  },
  {
    id: 'emp-exp-15',
    name: 'นายอัครเดช แก้วใจ',
    position: 'ชชง.',
    positionFull: 'ช่างชำนาญการ',
    phone: '083-4567890',
    defaultRole: 'troubleshooter',
    department: 'แผนกปฏิบัติการและบำรุงรักษา',
    note: 'ช่างชำนาญการ'
  }
];

export const DEFAULT_SHIFT_PRESETS: ShiftPreset[] = [
  {
    id: 'preset-1',
    title: 'กะ 1 (00.30 - 08.30 น.)',
    timeRange: '00.30 - 08.30 น.',
    description: 'กะ 1 (00.30 - 08.30 น.) ผู้สั่งการนายกอบชัย จิตต์มโน พร้อมทีมช่าง',
    eoOfficerName: 'นายกอบชัย จิตต์มโน',
    troubleshootersNames: ['นายสุจินต์ ไชยมูล', 'นายจักรวาล เกตุเกษี', 'นายรัชกร คุณลอย']
  },
  {
    id: 'preset-2',
    title: 'กะ 2 (08.30 - 16.30 น.)',
    timeRange: '08.30 - 16.30 น.',
    description: 'กะ 2 (08.30 - 16.30 น.) ผู้สั่งการนายกฤตพัส ธรรมชัย พร้อมทีมช่าง',
    eoOfficerName: 'นายกฤตพัส ธรรมชัย',
    troubleshootersNames: ['นายเจษฎา จอมนำ', 'นายกิตติชัย ใจนวล', 'นายสุรินทร์ พันธุพิน']
  },
  {
    id: 'preset-3',
    title: 'กะ 3 (16.30 - 00.30 น.)',
    timeRange: '16.30 - 00.30 น.',
    description: 'กะ 3 (16.30 - 00.30 น.) ผู้สั่งการนายณัฐพงค์ อินทร์ไชย พร้อมทีมช่าง',
    eoOfficerName: 'นายณัฐพงค์ อินทร์ไชย',
    troubleshootersNames: ['นายกิตติพัทธ์ เรือนชัย', 'นายทนงศักดิ์ ทองศรี', 'นายภาสกร ปันใจ']
  }
];

export const INITIAL_SHIFT_DATA: ShiftInfo = {
  id: 'shift-fang-2569-08-18',
  stationName: 'กฟส.ฝาง',
  stationFullName: 'การไฟฟ้าส่วนภูมิภาค สาขาฝาง',
  dayOfWeek: 'อังคาร',
  dayNumber: 18,
  month: 'สิงหาคม',
  yearBE: 2569,
  timeRange: '16.30 - 00.30 น.',
  shiftName: 'กะ 3 16.30 - 00.30 น.',
  mainPhone: '053-453539',
  peaCallCenter: '1129',
  location: '343 ม.4 ต.เวียง อ.ฝาง จ.เชียงใหม่ 50110',
  eoOfficer: {
    id: 'eo-1',
    name: 'นายณัฐพงค์ อินทร์ไชย',
    position: 'พชง.',
    positionFull: 'พนักงานช่าง',
    roleCategory: 'eo',
    roleTitle: 'พนักงานสั่งงานแก้กระแสไฟฟ้าขัดข้อง E/O',
    phone: '082-9364817',
    rawPhone: '0829364817',
    status: 'on_duty',
    isLead: true
  },
  troubleshooters: [
    {
      id: 'ts-1',
      name: 'นายกิตติพัทธ์ เรือนชัย',
      position: 'พชง.',
      positionFull: 'พนักงานช่าง',
      roleCategory: 'troubleshooter',
      roleTitle: 'พนักงานแก้ไฟฟ้าขัดข้อง',
      phone: '081-4686094',
      rawPhone: '0814686094',
      status: 'on_duty'
    },
    {
      id: 'ts-2',
      name: 'นายทนงศักดิ์ ทองศรี',
      position: 'ชชง.',
      positionFull: 'ช่างชำนาญการ',
      roleCategory: 'troubleshooter',
      roleTitle: 'พนักงานแก้ไฟฟ้าขัดข้อง',
      phone: '080-9068696',
      rawPhone: '0809068696',
      status: 'on_duty'
    },
    {
      id: 'ts-3',
      name: 'นายภาสกร ปันใจ',
      position: 'ชชง.',
      positionFull: 'ช่างชำนาญการ',
      roleCategory: 'troubleshooter',
      roleTitle: 'พนักงานแก้ไฟฟ้าขัดข้อง',
      phone: '080-8585876',
      rawPhone: '0808585876',
      status: 'on_duty'
    }
  ],
  note: 'พร้อมปฏิบัติหน้าที่แก้ไขกระแสไฟฟ้าขัดข้องตลอด 24 ชั่วโมง ติดต่อสายด่วน PEA 1129 หรือเบอร์สำนักงาน 053-453539',
  updatedAt: new Date().toISOString()
};

export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'inc-101',
    callerName: 'นายประสิทธิ์ วงศ์ใหญ่',
    callerPhone: '089-1234567',
    subdistrict: 'ต.เวียง',
    villageOrPlace: 'บ้านสระพัฒนา ซอย 4 ใกล้ตลาดสดฝาง',
    meterOrTransformerNo: 'TR-FANG-042',
    outageType: 'ไฟดับเฉพาะจุด (บ้านเรือน 3 หลัง)',
    severity: 'normal',
    description: 'ฟิวส์แรงต่ำขาดเนื่องจากมีกิ่งไม้พาดสายเล็กน้อย',
    reportedTime: '17:15 น.',
    assignedOfficerName: 'นายกิตติพัทธ์ เรือนชัย พชง.',
    assignedOfficerPhone: '081-4686094',
    status: 'resolved',
    resolutionTime: '18:05 น.',
    notes: 'เปลี่ยนฟิวส์แรงต่ำและตัดแต่งกิ่งไม้เรียบร้อย จ่ายไฟปกติ'
  },
  {
    id: 'inc-102',
    callerName: 'นางกาญจนา มณีรัตน์',
    callerPhone: '086-9876543',
    subdistrict: 'ต.แม่สูน',
    villageOrPlace: 'บ้านแม่สูนหลวง ม.2 ตรงข้ามโรงเรียนแม่สูน',
    meterOrTransformerNo: 'TR-MS-118',
    outageType: 'กิ่งไม้ใหญ่ล้มพาดสายแรงสูง',
    severity: 'urgent',
    description: 'มีลมกระโชกแรง กิ่งไม้ล้มพาดสายแรงสูง ทำให้ไฟดับเป็นบริเวณกว้าง',
    reportedTime: '18:40 น.',
    assignedOfficerName: 'นายทนงศักดิ์ ทองศรี & นายภาสกร ปันใจ',
    assignedOfficerPhone: '080-9068696',
    status: 'in_progress',
    notes: 'ชุดทีมงานกำลังตัดรอนกิ่งไม้และเคลียร์สายส่ง'
  }
];

export const FANG_SUBDISTRICTS = [
  'ต.เวียง',
  'ต.แม่สูน',
  'ต.สันทราย',
  'ต.ม่อนปิ่น',
  'ต.โป่งน้ำร้อน',
  'ต.แม่งอน',
  'ต.แม่ข่า',
  'ต.แม่คะ'
];

export const OUTAGE_TYPES = [
  'ไฟดับเฉพาะจุด / ดับหลังเดียว',
  'ไฟดับเป็นบริเวณกว้าง / ดับทั้งหมู่บ้าน',
  'หม้อแปลงระเบิด / ฟิวส์แรงสูงขาด',
  'กิ่งไม้พาดสายไฟฟ้า / ต้นไม้ล้มทับเสา',
  'เสาไฟฟ้าเอียง / หักโค่น / รถชนเสาไฟ',
  'สายไฟฟ้าขาดตกพื้น / มีประกายไฟ',
  'กระแสไฟฟ้าตก / ไฟกระพริบไม่สม่ำเสมอ',
  'อื่นๆ (แจ้งขอความช่วยเหลือ)'
];
