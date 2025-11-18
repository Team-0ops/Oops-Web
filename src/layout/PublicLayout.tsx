import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F1]">
      <Navbar />

      <div className="flex flex-col flex-1 bg-[#FDFDFD] rounded-t-[1.875rem] shadow-[0_0_9px_1px_rgba(0,0,0,0.10)]">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
