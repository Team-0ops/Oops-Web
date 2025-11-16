import Burger from "../../assets/icons/Burger.svg?react";
import Logo from "../../assets/icons/OopsLogo.svg?react";
import Search from "../../assets/icons/Search.svg?react";
import Write from "../../assets/icons/Write.svg?react";

const Navbar = () => {
  return (
    <nav className="w-full px-[5.12rem] py-[2.13rem]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Burger className="w-6 h-6" />
          <Logo className="w-auto h-[24px]" />
        </div>
        <div className="flex items-centexr gap-3">
          <Search />
          <Write />
          <>
            <div className="body5 px-[13px] py-[3px] justify-center items-center rounded-[20px] border border-[#1D1D1D]">
              로그인/회원가입
            </div>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
