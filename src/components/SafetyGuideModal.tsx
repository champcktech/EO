import React from 'react';
import { X, ShieldAlert, Zap, AlertTriangle, CheckCircle, PhoneCall, Info } from 'lucide-react';

interface SafetyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationPhone: string;
}

export const SafetyGuideModal: React.FC<SafetyGuideModalProps> = ({
  isOpen,
  onClose,
  stationPhone
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl text-slate-100 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">คู่มือความปลอดภัยกรณีไฟฟ้าขัดข้อง (PEA Safety)</h2>
              <p className="text-xs text-slate-400">คำแนะนำสำหรับประชาชนและการปฏิบัติงาน กฟส.ฝาง</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="my-4 space-y-4 text-xs sm:text-sm text-slate-300">
          {/* Card 1: Falling Wires */}
          <div className="p-3.5 bg-rose-950/30 border border-rose-800/40 rounded-xl">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-rose-200 text-sm">1. กรณีสายไฟฟ้าขาดตกพื้น หรือเสาไฟล้ม</h3>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300">
                  <li><strong>ห้ามเข้าใกล้หรือสัมผัสสายไฟโดยเด็ดขาด</strong> และให้รักษาระยะห่างอย่างน้อย <strong>8 - 10 เมตร</strong></li>
                  <li>กั้นพื้นที่ไม่ให้คนหรือสัตว์เลี้ยงเข้าใกล้บริเวณดังกล่าว</li>
                  <li>รีบโทรแจ้ง <strong>กฟส.ฝาง 053-453539</strong> หรือ <strong>PEA 1129</strong> ทันที</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2: Tree Branches */}
          <div className="p-3.5 bg-amber-950/30 border border-amber-800/40 rounded-xl">
            <div className="flex items-start gap-2.5">
              <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-200 text-sm">2. กิ่งไม้ล้มพาดสายไฟฟ้า / ฝนตกฟ้าคะนอง</h3>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300">
                  <li>อย่าพยายามตัดแต่งกิ่งไม้ที่แตะถูกสายไฟฟ้าด้วยตนเอง เพราะอาจมีกระแสไฟฟ้ารั่ว</li>
                  <li>ปลดสวิตช์เครื่องใช้ไฟฟ้าที่บอบบาง เช่น โทรทัศน์ คอมพิวเตอร์ ป้องกันแรงดันไฟฟ้ากระชาก</li>
                  <li>หากพบประกายไฟที่หม้อแปลง ให้แจ้ง E/O ผู้สั่งการเวรทันที</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3: Outage Checklist */}
          <div className="p-3.5 bg-purple-950/30 border border-purple-800/40 rounded-xl">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-purple-200 text-sm">3. สิ่งที่ควรเตรียมเมื่อแจ้งเหตุไฟฟ้าดับ</h3>
                <ul className="list-disc list-inside mt-1 space-y-1 text-slate-300">
                  <li>สถานที่เกิดเหตุที่ชัดเจน (หมู่บ้าน, ซอย, จุดสังเกตสำคัญใน ต.เวียง, ต.แม่สูน ฯลฯ)</li>
                  <li>หมายเลขผู้ใช้ไฟฟ้า (CA/PEA NO.) หรือรหัสที่ระบุบนเสาไฟ/หม้อแปลงใกล้เคียง</li>
                  <li>เบอร์โทรศัพท์ที่ช่างเวรสามารถติดต่อกลับได้สะดวก</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-amber-400">
            <Info className="w-4 h-4" />
            <span>กฟส.ฝาง ยินดีให้บริการประชาชนตลอด 24 ชั่วโมง</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition cursor-pointer"
          >
            เข้าใจแล้ว / ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
