import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF]">
      <Navbar />

      <div className="flex flex-col flex-1 rounded-t-[1.875rem] shadow-[0_0_9px_1px_rgba(0,0,0,0.10)] xl:mx-0 mx-[1.87rem] xl:gap-[12.5rem] gap-[5.56rem]">
        <main className="flex-1 xl:px-[5.12rem] px-[1.44rem] xl:pt-[3.75rem]">
          {/* 전체 Layout main 부분에 Padding을 주어서 컴포넌트,페이지에서는 w-full로 사용하시면 됩니다. */}
          <Outlet />
        </main>
      </div>

        <Footer />
    </div>
  );
};

export default PublicLayout;
