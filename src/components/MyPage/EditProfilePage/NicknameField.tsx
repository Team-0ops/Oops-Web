type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function NicknameField({ value, onChange }: Props) {
  return (
    <div className="mb-[1.25rem]">
      <div className="text-[0.85rem] text-[#444] mb-[0.5rem]">닉네임 변경</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="기존 닉네임"
        className="w-full h-[2.75rem] px-[0.9rem] rounded-[0.4rem]
                   border border-[#e6e6e6] outline-none
                   focus:border-[#B3E378]"
      />
    </div>
  );
}
