import OopsLogoDark from "../../assets/icons/OopsLogoDark.svg?react";

type NavItem = "report" | "user";

interface AdminHeaderProps {
  currentNav?: NavItem;
  onNavChange?: (nav: NavItem) => void;
}

export const AdminHeader = ({
  currentNav = "report",
  onNavChange,
}: AdminHeaderProps) => {
  const handleLogout = () => {
    // TODO: 로그아웃 로직 구현
  };

  return (
    <>
      <header className="w-full flex justify-between items-center py-6 px-16 bg-white">
        {/* 좌측: 로고 */}
        <div className="flex items-center">
          <OopsLogoDark className="w-[58px] h-[58px]" />
        </div>

        {/* 중앙: 네비게이션 */}
        <div className="flex justify-center items-center w-full max-w-7xl border-1 border-[#E4E4E4] rounded-full p-2 m-4">
          <button
            onClick={() => onNavChange?.("report")}
            className={`px-6 py-2 body2 transition-colors w-full h-full rounded-full ${
              currentNav === "report"
                ? "bg-[#262627] text-[#B3E378]"
                : "bg-[#FAFAFA] text-[#262627]"
            }`}
          >
            신고 관리
          </button>
          <button
            onClick={() => onNavChange?.("user")}
            className={`px-6 py-2 body2 transition-colors w-full h-full rounded-full ${
              currentNav === "user"
                ? "bg-[#262627] text-[#B3E378]"
                : "bg-[#FAFAFA] text-[#262627]"
            }`}
          >
            유저 관리
          </button>
        </div>

        {/* 우측: 관리자 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="body2 text-[#262627] hover:underline"
        >
          관리자<br/>로그아웃
        </button>
      </header>
    </>
  );
};

export default AdminHeader;

