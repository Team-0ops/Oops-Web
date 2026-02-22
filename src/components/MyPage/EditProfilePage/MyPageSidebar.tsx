import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const menus = [
  { to: "/my-profile/profile", label: "프로필 수정" },
  { to: "/my-profile/posts", label: "내 실패담" },
  { to: "/my-profile/lessons", label: "내 교훈" },
];

const MyPageSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="
    w-[9.875rem] max-h-[22.25rem] rounded-[0.5rem]
    border-[0.06rem] border-[#e4e4e4] bg-[#fafafa]"
    >
      <ul className="w-full h-full flex flex-col gap-[2.5rem] py-[2.5rem] px-[1.88rem]">
        {menus.map((m) => (
          <li key={m.to}>
            <NavLink
              to={m.to}
              className={({ isActive }) =>
                ` ${isActive ? "font-semibold" : "bg-white"}`
              }
            >
              {m.label}
            </NavLink>
          </li>
        ))}
        <li className="mt-[3.525rem]">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="cursor-pointer"
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MyPageSidebar;
