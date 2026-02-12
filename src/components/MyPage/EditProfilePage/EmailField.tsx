type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function EmailField({ value, onChange }: Props) {
  return (
    <div className="mb-[1.5rem]">
      <div className="text-[0.85rem] text-[#444] mb-[0.5rem]">이메일 변경</div>

      <div className="flex gap-[0.75rem]">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="기존이메일@naver.com"
          className="flex-1 h-[2.75rem] px-[0.9rem] rounded-[0.4rem]
                     border border-[#e6e6e6] outline-none
                     focus:border-[#B3E378]"
        />

        <button
          type="button"
          disabled
          className="h-[2.75rem] px-[1rem] rounded-[0.4rem]
                     bg-[#B3E378] text-[#111] text-[0.85rem] font-semibold
                     disabled:opacity-60 disabled:cursor-not-allowed"
          title="이메일 변경 로직 추후 개발"
        >
          인증번호 발송
        </button>
      </div>
    </div>
  );
}
