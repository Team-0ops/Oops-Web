import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import PostReportDetailInfo from "../../components/Admin/PostReportDetailInfo";
import ActionButtons from "../../components/Admin/ActionButtons";
import ReportHistoryTable from "../../components/Admin/ReportHistoryTable";
import Pagination from "../../components/Admin/Pagination";
import {
  postReportDetailData,
  reportHistoryData,
} from "../../mocks/adminReportData";

export const PostReportDetailPage = () => {
  const { id: _id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  // 버셀 에러 해결을 위한 id값 사용
  console.log("id",_id)

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportHistoryData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(reportHistoryData.length / itemsPerPage);

  const handleWarningClick = () => {
    // TODO: 경고 메시지 보내기 로직 구현
  };

  const handleDeleteClick = () => {
    // TODO: 게시글 강제 삭제 로직 구현
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
      <AdminHeader currentNav="report" onNavChange={handleNavChange} />
      <div className="flex flex-col items-center w-full px-8 pb-6 justify-center">
        <div className="mb-6">
          <h1 className="h1 text-[#262627]">게시글 신고 상세</h1>
        </div>
        <div className="w-full max-w-7xl bg-white rounded-xl shadow-sm border border-[#E4E4E4]">
          <div className="p-6">
            <div className="mb-6">
              <PostReportDetailInfo data={postReportDetailData} />
            </div>
            <div className="mb-6">
              <ActionButtons
                warningButtonText="해당 게시글 작성자에게 경고 메시지 보내기"
                deleteButtonText="게시글 강제 삭제"
                onWarningClick={handleWarningClick}
                onDeleteClick={handleDeleteClick}
              />
            </div>
            <div className="mb-4">
              <ReportHistoryTable data={currentItems} />
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

export default PostReportDetailPage;

