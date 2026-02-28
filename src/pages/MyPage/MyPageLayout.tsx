import { Outlet } from "react-router-dom";
import  MyPageSidebar  from "../../components/MyPage/EditProfilePage/MyPageSidebar";

export default function MyPageLayout() {
  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold mb-6">마이 페이지</h1>

      <div className="flex gap-[1.88rem]">
        <MyPageSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
