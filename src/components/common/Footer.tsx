const Footer = () => {
  return (
    <footer className="w-full h-56.25 py-9.25">
      <div className="caption2 flex w-full gap-24.75 text-[#6F6F6F] pt-10 border-t-2 border-[#B2B2B2]">
        <div className="flex flex-col gap-7.5">
          <p className="hover:underline cursor-pointer">서비스 소개</p>
          <p className="hover:underline cursor-pointer">광고문의</p>
          <p className="hover:underline cursor-pointer">멤버 소개</p>
        </div>

        <div className="flex flex-col gap-7.5">
          <p className="hover:underline cursor-pointer">이용약관</p>
          <p className="hover:underline cursor-pointer">개인정보 처리방침</p>
          <p className="hover:underline cursor-pointer">신고가이드</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
