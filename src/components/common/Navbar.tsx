import { useState } from "react";
import Burger from "../../assets/icons/Burger.svg?react";
import Logo from "../../assets/icons/OopsLogo.svg?react";
import Search from "../../assets/icons/Search.svg?react";
import Profile from "../../assets/icons/Profile.svg?react";
import { Sidebar } from "./Sidebar";

import {useNavigate} from "react-router-dom";

import { useAuth } from "../../context/AuthContext.tsx";

/*
Common Component : Navbar
 */
const Navbar = () => {
  const {isAuthenticated, user} = useAuth()
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="w-full h-28.25 flex justify-between items-center">
        <div className="flex gap-12.5">
          <div className="flex gap-7.5">
            <button onClick={() => setIsSidebarOpen(true)}>
              <Burger />
            </button>
            <Logo
              onClick ={() => navigate("/")}
            />
          </div>
          <div className="body3 flex gap-7.5">
            <div
                onClick ={() => navigate("/random-feed")}
                className="cursor-pointer"
            >
              랜덤 주제 피드
            </div>
            <div
                onClick ={() => navigate("/lucky-draw")}
                className="cursor-pointer"
            >
              행운 부적 추첨
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="caption3 w-43.75 h-9 flex rounded-[1.875rem] border border-[#E4E4E4] bg-[#F6F6F6] justify-center items-center gap-[0.38rem]">
            <input
                className="caption3 bg-transparent outline-none w-auto placeholder:text-[#9E9E9E]"
                placeholder="무엇이든 물어보세요."
            />
            <Search />
          </div>

          {isAuthenticated ? (
                  <button
                      onClick={() => navigate("/my-profile")}
                  >
                    {user?.profileImageUrl ? (
                        <img
                            src={user.profileImageUrl}
                            alt="프로필"
                            className="w-9 h-9 rounded-full object-cover"
                        />
                    ) : (
                        <Profile className="w-9 h-9" />
                    )}
                  </button>
              )
              :
              <button
              className="w-24 h-9 rounded-[1.875rem] bg-[#B3E378] text-[#262627]"
              onClick={() => {navigate("/login")}}
              >
              로그인
              </button>
          }
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
