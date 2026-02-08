import X from "../../../assets/icons/X.svg?react";
import {  useState } from "react";
import { ReportTarget } from "../../../types/post";

export type ReportSubmitPayload = {
  content: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: ReportSubmitPayload) => void;
  isSubmitting?: boolean;
  target?: ReportTarget | null; // 선택: 문구 분기하고 싶으면
};

const MAX_LEN = 300;

const Report = ({
  isOpen,
  onSubmit,
  onClose,
}: Props) => {
  const [content, setContent] = useState<string>("");

  const length = content.length;

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({  content: content ?? "" });
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={(e) => {
        // 바깥 클릭 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="
          w-[55.25rem] h-[39.4375rem] bg-[#fff]
          rounded-[0.5rem]
          p-[1.88rem]
          shadow-[0_0_9px_0_rgba(0,0,0,0.25)]
          flex flex-col gap-[1.88rem]
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center justify-center">
          <span className="text-[1.25rem] font-semibold">신고</span>
          <button type="button" onClick={onClose} className="absolute right-0">
            <X />
          </button>
        </div>

        <div className="w-full flex flex-col  gap-[1rem] px-[3.22rem]">
          <span className="text-[1rem] font-semibold">신고사유</span>

          <textarea
            value={content}
            onChange={(e) => {
              const next = e.target.value;
              if (next.length <= MAX_LEN) setContent(next);
            }}
            className="
              w-full h-[14.625rem]  
              rounded-[0.5rem]
              bg-[#fafafa]
              border-[0.06rem] border-[#e4e4e4]
              px-[1.25rem] py-[1rem]
              resize-none
              outline-none
              placeholder:text-[#b2b2b2]
            "
            placeholder="신고 사유를 입력해주세요"
          />

          <div className="flex justify-end">
            <span>
              {length}/{MAX_LEN}
            </span>
          </div>

          <span className="mt-[2.75rem]">
            허위 신고의 경우, 사용자님의 계정 정지 위험이 있습니다.
          </span>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="
          w-[10.125rem] h-[3.125rem]
          items-center
          rounded-[0.5rem]
          bg-[#b3e378]
          text-[#262626]
          font-medium
          disabled:bg-[#e4e4e4]
          disabled:text-[#999999]
        "
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
