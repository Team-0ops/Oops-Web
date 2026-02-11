type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "confirm";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export const Button = ({
  children,
  onClick,
  variant = "default",
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-pretendard font-semibold h-11 px-4 rounded-lg transition-colors flex-shrink-0 min-w-32 w-auto ${className} ${
        disabled
          ? "bg-[#D2D2D2] text-[#262627] cursor-not-allowed"
          : variant === "confirm"
          ? "bg-[#B3E378] text-[#262627] hover:bg-[#A3D368]"
          : "bg-[#E4E4E4] text-[#6F6F6F] hover:bg-[#D4D4D4]"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;

