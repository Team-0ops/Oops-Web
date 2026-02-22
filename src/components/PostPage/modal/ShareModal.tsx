import { useEffect, useState } from "react";
import X from "../../../assets/icons/X.svg?react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
};

const ShareModal = ({ isOpen, onClose, url }: Props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) setCopied(false);
  }, [isOpen, url]);


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      //fallback (일부 브라우저/환경)
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  };

  if (!isOpen) return null;

  return (
    
      <div
        className="
        absolute right-0 top-[4rem] z-50
        w-[40.125rem] bg-white
        rounded-[0.5rem]
        shadow-[0_0_9px_0_rgba(0,0,0,0.25)]
        py-[1.5rem]
        -translate-y-[1.5rem]
      "
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center justify-center px-[1.88rem]">
          <span className="text-[1.5rem] font-semibold text-[#262626]">
            공유하기
          </span>
          <button
            type="button"
            onClick={onClose}
            className="absolute cursor-pointer right-[1.88rem]"
            aria-label="close"
          >
            <X />
          </button>
        </div>
        <div className="mt-[1.75rem] px-[1.88rem]">
          <div className="flex items-center gap-[1.25rem]">
            {/* URL 박스 */}
            <div
              className="
          flex-1 h-[3.25rem]
          rounded-[0.5rem]
          border border-[#b3e378]
          px-[1.25rem]
          flex items-center
          overflow-hidden
        "
              title={url}
            >
              <span className="truncate text-[#6f6f6f] text-[1rem] font-medium">
                {url}
              </span>
            </div>

            {/* 복사 버튼 */}
            <button
              type="button"
              onClick={copyToClipboard}
              disabled={copied}
              className="
          w-[5.25rem] h-[3.25rem]
          rounded-[0.5rem]
          bg-[#b3e378]
          text-[#262626]
          font-semibold
          disabled:bg-[#b3e378]
          cursor-pointer
        "
            >
              {copied ? "복사완료" : "복사"}
            </button>
          </div>
        </div>
      </div>
  );
};

export default ShareModal;
