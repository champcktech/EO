import { ShiftInfo, DutyOfficer } from '../types';

export function formatLineMessage(shift: ShiftInfo): string {
  const troubleshootersText = shift.troubleshooters
    .map(
      (ts, index) =>
        `${index + 1}. ${ts.name} ${ts.position} ${ts.phone}`
    )
    .join('\n');

  return `⚡ รายชื่อผู้ปฏิบัติงานเข้าเวร แก้ไฟฟ้าขัดข้อง ${shift.stationName}
📅 ประจำวัน ${shift.dayOfWeek} ที่ ${shift.dayNumber} เดือน ${shift.month} พ.ศ.${shift.yearBE}
⏰ เวลา ${shift.timeRange}

👷‍♂️ พนักงานแก้ไฟฟ้าขัดข้อง
${troubleshootersText}

📡 พนักงานสั่งงานแก้กระแสไฟฟ้าขัดข้อง E/O
${shift.eoOfficer.name} ${shift.eoOfficer.position} ${shift.eoOfficer.phone}

☎️ เบอร์โทรศัพท์ติดต่อ ${shift.mainPhone}
📞 PEA Contact Center ${shift.peaCallCenter}

🌐 ระบบตารางเวรออนไลน์: https://champcktech.github.io/EO/`;
}

export function generateVCard(officer: DutyOfficer, stationName: string = 'กฟส.ฝาง'): string {
  const cleanPhone = officer.phone.replace(/[^0-9]/g, '');
  return `BEGIN:VCARD
VERSION:3.0
N:${officer.name};;;;
FN:${officer.name} ${officer.position}
ORG:การไฟฟ้าส่วนภูมิภาค ${stationName}
TITLE:${officer.roleTitle}
TEL;TYPE=CELL,VOICE:${cleanPhone}
NOTE:เวรแก้ไฟฟ้าขัดข้อง ${stationName}
END:VCARD`;
}

export function downloadVCard(officer: DutyOfficer, stationName: string = 'กฟส.ฝาง') {
  const vcardText = generateVCard(officer, stationName);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${officer.name.replace(/\s+/g, '_')}_PEA.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-999999px';
      textarea.style.top = '-999999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
}

export function getPositionBadge(pos: string) {
  switch (pos.trim()) {
    case 'พชง.':
      return {
        code: 'พชง.',
        title: 'พนักงานช่าง',
        color: 'bg-purple-900/60 text-purple-200 border-purple-500/40',
        desc: 'พนักงานช่างไฟฟ้า PEA'
      };
    case 'ชชง.':
      return {
        code: 'ชชง.',
        title: 'ช่างชำนาญการ',
        color: 'bg-amber-900/60 text-amber-200 border-amber-500/40',
        desc: 'ช่างชำนาญการ / ช่างปฏิบัติการ'
      };
    default:
      return {
        code: pos,
        title: pos,
        color: 'bg-slate-800 text-slate-200 border-slate-600',
        desc: pos
      };
  }
}
