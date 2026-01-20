import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#FFF]">
        <div className="mx-auto max-w-[1600px] flex min-h-screen flex-col px-27 gap-10">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    </div>
  );
};

export default PublicLayout;
