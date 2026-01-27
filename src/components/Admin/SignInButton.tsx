interface SignInButtonProps {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const SignInButton = ({
  type = "submit",
  children = "로그인",
  onClick,
  className = "",
  disabled = false,
}: SignInButtonProps) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full h-14 rounded-lg bg-[#B3E378] text-[#262627] body1 font-semibold cursor-pointer hover:bg-[#A3D368] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default SignInButton;

