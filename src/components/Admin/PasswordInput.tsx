interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  placeholder = "비밀번호를 입력해주세요.",
  className = "",
}: PasswordInputProps) => {
  return (
    <>
      <div className={`flex flex-col gap-3 ${className}`}>
        <label htmlFor={id} className="body2 text-[#262627]">
          {label}
        </label>
        <input
          id={id}
          type="password"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-14 px-4 rounded-lg border border-[#E4E4E4] bg-[#FAFAFA] placeholder:text-[#9E9E9E] body3 focus:border-[#B3E378] focus:border-2 outline-none"
        />
      </div>
    </>
  );
};

export default PasswordInput;

