import { useIsMobile } from "../../hooks/common/useIsMobile";

const Footer = () => {
  //현재 모바일인지 아닌자 판별하는 훅 : boolean 반환
  const isMobile = useIsMobile();

  return (
    <footer className="flex w-full border-t border-[#999] bg-[#FFF] py-4">
      <div className="flex w-full pt-[1.87rem] pl-[5.12rem] gap-[2.56rem] text-[#666]">
        {/* 왼쪽 메뉴 */}
        <div className="flex flex-col gap-1 text-sm">
          <p className="hover:underline cursor-pointer">서비스 소개</p>
          <p className="hover:underline cursor-pointer">광고문의</p>
          <p className="hover:underline cursor-pointer">멤버 소개</p>
        </div>

        {/* 오른쪽 메뉴 */}
        <div className="flex flex-col gap-1 text-sm">
          <p className="hover:underline cursor-pointer">이용약관</p>
          <p className="hover:underline cursor-pointer">개인정보 처리방침</p>
          <p className="hover:underline cursor-pointer">신고가이드</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
