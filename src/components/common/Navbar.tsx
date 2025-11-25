import Burger from "../../assets/icons/Burger.svg?react";
import Logo from "../../assets/icons/OopsLogo.svg?react";
import Search from "../../assets/icons/Search.svg?react";
import Write from "../../assets/icons/Write.svg?react";

const Navbar = () => {
  return (
    // 화면의 크기가 xl, sm 이 아닌 경우 기본 padding 값 결정이 안돼서 안넣음.
    <nav className="w-full h-[6.12rem] flex justify-center items-center xl:px-[5.13rem] px-[1.87rem]">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-3">
          <Burger className="w-6 h-6" />
          <Logo className="w-auto h-[24px]" />
        </div>
        <div className="flex items-centexr gap-3">
          <Search className="w-[1.875rem] h-[1.875rem]" />
          <Write className="w-[1.875rem] h-[1.875rem]" />
          <div className="body2 w-[8.625rem] h-[1.875rem] flex justify-center items-center rounded-[1.25rem] bg-[#B3E378]">
            <p>로그인/회원가입</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
