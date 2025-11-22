import { useIsMobile } from "../../hooks/common/useIsMobile";

const Footer = () => {
  //현재 모바일인지 아닌자 판별하는 훅 : boolean 반환
  const isMobile = useIsMobile();

  return (
    <footer className="flex w-full h-[8.125rem] border-t border-[#999]">
      <div className="caption3 flex w-full pt-[1.87rem] pl-[5.12rem] sm:pl-[1.44rem] xl:pl-[5.12rem] gap-[2.56rem] text-[#CCC] ">
        <div className="flex flex-col gap-[0.38rem]">
          <p className="hover:underline cursor-pointer">서비스 소개</p>
          <p className="hover:underline cursor-pointer">광고문의</p>
          <p className="hover:underline cursor-pointer">멤버 소개</p>
        </div>

        <div className="flex flex-col gap-[0.38rem]">
          <p className="hover:underline cursor-pointer">이용약관</p>
          <p className="hover:underline cursor-pointer">개인정보 처리방침</p>
          <p className="hover:underline cursor-pointer">신고가이드</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
