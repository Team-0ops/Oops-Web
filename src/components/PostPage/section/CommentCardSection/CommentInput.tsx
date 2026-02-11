import { useCallback } from "react";

type CommentInputProps = {
  value: string;
  onChange: (next: string) => void;
  onSubmit: () => void;

  placeholder?: string;
  submitLabel?: string;

  disabled?: boolean;

  /** 입력 형태: 기본 input, 필요하면 textarea */
  multiline?: boolean;

  /** wrapper/내부 스타일 오버라이드 */
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
};

export default function CommentInput({
  value,
  onChange,
  onSubmit,
  placeholder = "댓글을 입력하세요.",
  submitLabel = "작성",
  disabled = false,
  multiline = false,
  className = "",
  inputClassName = "",
  buttonClassName = "",
}: CommentInputProps) {
  const canSubmit = value.trim().length > 0 && !disabled;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // textarea에서는 Enter submit 안 하고 싶으면 여기서 multiline 체크로 막아도 됨
      if (!multiline && e.key === "Enter") {
        e.preventDefault();
        if (canSubmit) onSubmit();
      }
    },
    [canSubmit, multiline, onSubmit]
  );

  return (
    <div className={`flex justify-center gap-[1.25rem] items-center ${className}`}>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`
            w-full h-[4.5rem] resize-none
            rounded-[0.5rem] border-[0.06rem] border-[#d2d2d2]
            bg-[#fff]
            px-[1.19rem] py-[1rem]
            placeholder:text-[#464646] outline-none
            ${inputClassName}
          `}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`
            w-full h-[3.125rem]
            rounded-[0.5rem] border-[0.06rem] border-[#d2d2d2]
            bg-[#fff]
            px-[1.19rem] py-[1rem]
            placeholder:text-[#464646]
            ${inputClassName}
          `}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit}
        className={`
          flex justify-center items-center
          w-[8.375rem] h-[3.125rem]
          rounded-[0.5rem]
          bg-[#b3e378]
          disabled:opacity-50
          ${buttonClassName}
        `}
      >
        {submitLabel}
      </button>
    </div>
  );
}
