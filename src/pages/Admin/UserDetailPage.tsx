import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import UserDetailInfo from "../../components/Admin/UserDetailInfo";
import ActionButtons from "../../components/Admin/ActionButtons";
import UserReportHistoryTable from "../../components/Admin/UserReportHistoryTable";
import Pagination from "../../components/Admin/Pagination";
import {
  userDetailData,
  userReportHistoryData,
} from "../../mocks/adminReportData";

export const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userReportHistoryData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(userReportHistoryData.length / itemsPerPage);

  const handleDeleteClick = () => {
    // TODO: 유저 강제 삭제 로직 구현
    console.log("유저 강제 삭제:", id);
  };

  const handleNavChange = (nav: "report" | "user") => {
    if (nav === "user") {
      navigate("/admin?nav=user");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <AdminHeader currentNav="user" onNavChange={handleNavChange} />
      <div className="flex flex-col items-center w-full px-8 pb-6 justify-center">
        <div className="mb-6">
          <h1 className="h1 text-[#262627]">유저 관리</h1>
        </div>
        <div className="w-full max-w-7xl bg-white rounded-xl shadow-sm border border-[#E4E4E4]">
          <div className="p-6">
            
            <div className="mb-6">
              <UserDetailInfo data={userDetailData} />
            </div>
            <div className="mb-6">
              <ActionButtons
                warningButtonText=""
                deleteButtonText="유저 강제 삭제"
                onWarningClick={() => {}}
                onDeleteClick={handleDeleteClick}
              />
            </div>
            <div className="mb-4">
              <UserReportHistoryTable data={currentItems} />
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;

