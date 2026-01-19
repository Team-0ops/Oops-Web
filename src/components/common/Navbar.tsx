import Burger from "../../assets/icons/Burger.svg?react";
import Logo from "../../assets/icons/OopsLogo.svg?react";
import Search from "../../assets/icons/Search.svg?react";

//import { useAuth } from "../../context/AuthContext.tsx";

/*
Common Component : Navbar
 */
const Navbar = () => {
  //const {isAuthenticated, user} = useAuth()
  return (
    <nav className="w-full h-28.25 flex justify-between items-center">
        <div className="flex gap-12.5">
          <div className="flex gap-7.5">
            <Burger />
            <Logo />
          </div>
          <div className="body3 flex gap-7.5">
            <div>
              랜덤 주제 피드
            </div>
            <div>
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

          <button className="w-24 h-9 rounded-[1.875rem] bg-[#B3E378] text-[#262627]">
            로그인
          </button>
        </div>
    </nav>
  );
};

export default Navbar;
