import { Outlet } from "react-router-dom";
import  MyPageSidebar  from "../../components/MyPage/MyPageSidebar";

export default function MyPageLayout() {
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-6">마이 페이지</h1>

      <div className="flex gap-8">
        <MyPageSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
