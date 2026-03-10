import { useCallback } from "react";
import { motion } from "framer-motion";
import X from "../../assets/icons/X.svg?react";
import type { LuckyCard } from "../../types/lucky";

const SAVED_CHARMS_KEY = "oops-saved-lucky-charms";

interface FullResultCardProps {
  onClose: () => void;
  card: LuckyCard & { FrontComponent: React.FC };
}

const formatContent = (text: string, maxCharsPerLine: number) => {
  let result = "";
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    result += text[i];
    count++;

    if (count >= maxCharsPerLine && /[ ,，.]/.test(text[i])) {
      result += "\n";
      count = 0;
    }
  }

  return result;
};

const FullResultCard = ({ onClose, card }: FullResultCardProps) => {
  const { name, content, FrontComponent } = card;

  const handleSave = useCallback(() => {
    try {
      const saved = localStorage.getItem(SAVED_CHARMS_KEY);
      const list: Array<{ name: string; content: string; savedAt: string }> = saved
        ? JSON.parse(saved)
        : [];
      list.push({ name, content, savedAt: new Date().toISOString() });
      localStorage.setItem(SAVED_CHARMS_KEY, JSON.stringify(list));
      alert("행운 부적이 저장되었습니다.");
    } catch {
      alert("저장에 실패했습니다.");
    }
  }, [name, content]);

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-[24px]"
      >
        <div className="mb-[6px] relative left-[150px]">
          <X
            className="w-[16px] h-[16px] cursor-pointer"
            onClick={onClose}
          />
        </div>

        <h2 className="text-[#FFFBF8] text-[24px] font-bold mb-[12px] text-center">
          {name}
        </h2>

        <p className="text-[#FFFBF8] text-[14px] font-semibold text-center leading-snug mb-[24px] whitespace-pre-line">
          {formatContent(content, 15)}
        </p>

        <div className="w-[250px] h-[353px] mb-[46px] rounded-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden bg-white">
          <FrontComponent />
        </div>

        <div className="flex gap-3 w-full max-w-[335px]">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 bg-[#E6F3D7] text-[16px] font-semibold py-[12px] h-[63px] rounded-[4px] border border-[#B3E378] cursor-pointer"
          >
            저장
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#B3E378] text-[16px] font-semibold py-[12px] h-[63px] rounded-[4px] cursor-pointer"
          >
            확인
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default FullResultCard;
