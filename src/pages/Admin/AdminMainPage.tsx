import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import PostReportTable from "../../components/Admin/PostReportTable";
import CommentReportTable from "../../components/Admin/CommentReportTable";
import UserReportedTable from "../../components/Admin/UserReportedTable";
import Pagination from "../../components/Admin/Pagination";
import {
  postReportData,
  commentReportData,
  userReportedData,
  type PostReportData,
  type CommentReportData,
  type UserReportedData,
} from "../../mocks/adminReportData";

type TabType = "post" | "comment";
type NavType = "report" | "user";

export const AdminMainPage = () => {
  const [searchParams] = useSearchParams();
  const [currentNav, setCurrentNav] = useState<NavType>("report");
  const [activeTab, setActiveTab] = useState<TabType>("post");
  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // 한 페이지당 5개 항목

  // URL 쿼리 파라미터에서 nav 값 읽기
  useEffect(() => {
    const navParam = searchParams.get("nav");
    if (navParam === "user") {
      setCurrentNav("user");
    } else {
      setCurrentNav("report");
    }
  }, [searchParams]);

  const handlePostCheckboxChange = (reportId: number) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handlePostSelectAll = () => {
    if (selectedReports.length === postReportData.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(postReportData.map((report) => report.id));
    }
  };

  const handleCommentCheckboxChange = (reportId: number) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleCommentSelectAll = () => {
    if (selectedReports.length === commentReportData.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(commentReportData.map((report) => report.id));
    }
  };

  const handleNavChange = (nav: NavType) => {
    setCurrentNav(nav);
    setActiveTab("post"); // 네비게이션 변경 시 기본 탭으로 초기화
    setSelectedReports([]);
    setSelectedUsers([]);
    setCurrentPage(1); // 페이지네이션 초기화
  };

  // 현재 표시할 데이터 계산
  const currentReportData =
    activeTab === "post" ? postReportData : commentReportData;
  const currentTableData =
    currentNav === "report" ? currentReportData : userReportedData;

  // 페이지네이션 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentTableData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(currentTableData.length / itemsPerPage);

  const handleUserCheckboxChange = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleUserSelectAll = () => {
    if (selectedUsers.length === userReportedData.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(userReportedData.map((user: UserReportedData) => user.userId));
    }
  };

  const handleHide = () => {
    // TODO: 숨김 처리 로직 구현
    if (currentNav === "report") {
      // 신고 숨김 처리
    } else {
      // 유저 숨김 처리
    }
  };

  const hasSelectedItems =
    currentNav === "report"
      ? selectedReports.length > 0
      : selectedUsers.length > 0;

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <AdminHeader currentNav={currentNav} onNavChange={handleNavChange} />

        {/* 메인 콘텐츠 영역 */}
        <div className="w-full px-8 py-6 flex justify-center">
          <div className="w-full max-w-7xl bg-white rounded-xl shadow-sm border border-[#E4E4E4]">
            {currentNav === "report" ? (
              <>
                {/* 탭 네비게이션 */}
                <div className="flex justify-center items-center border-1 border-[#E4E4E4] rounded-full p-2 m-4">
                  <button
                    onClick={() => {
                      setActiveTab("post");
                      setSelectedReports([]);
                      setCurrentPage(1); // 탭 변경 시 페이지네이션 초기화
                    }}
                    className={`px-6 py-2 body2 w-full h-full transition-colors rounded-full ${
                      activeTab === "post"
                        ? "bg-[#B3E378] text-[#262627] shadow-xl"
                        : "bg-[#FAFAFA] text-[#6F6F6F]"
                    }`}
                  >
                    게시글 신고 관리
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("comment");
                      setSelectedReports([]);
                      setCurrentPage(1); // 탭 변경 시 페이지네이션 초기화
                    }}
                    className={`px-6 py-2 body2 w-full h-full transition-colors rounded-full ${
                      activeTab === "comment"
                        ? "bg-[#B3E378] text-[#262627] shadow-xl"
                        : "bg-[#FAFAFA] text-[#6F6F6F]"
                    }`}
                  >
                    댓글 신고 관리
                  </button>
                </div>

                {/* 테이블 */}
                {activeTab === "post" ? (
                  <PostReportTable
                    data={currentItems as PostReportData[]}
                    selectedIds={selectedReports}
                    onCheckboxChange={handlePostCheckboxChange}
                    onSelectAll={handlePostSelectAll}
                  />
                ) : (
                  <CommentReportTable
                    data={currentItems as CommentReportData[]}
                    selectedIds={selectedReports}
                    onCheckboxChange={handleCommentCheckboxChange}
                    onSelectAll={handleCommentSelectAll}
                  />
                )}
              </>
            ) : (
              <>
                {/* 유저 관리 테이블 */}
                <UserReportedTable
                  data={currentItems as UserReportedData[]}
                  selectedIds={selectedUsers}
                  onCheckboxChange={handleUserCheckboxChange}
                  onSelectAll={handleUserSelectAll}
                />
              </>
            )}

            {/* 하단 액션 버튼 */}
            <div className="p-6 border-t border-[#E4E4E4]">
              <button
                onClick={handleHide}
                disabled={!hasSelectedItems}
                className={`w-full py-2 rounded-lg body1 font-semibold transition-colors ${
                  hasSelectedItems
                    ? "bg-[#B3E378] text-[#262627] hover:bg-[#A3D368] cursor-pointer"
                    : "bg-[#E4E4E4] text-[#9E9E9E] cursor-not-allowed"
                }`}
              >
                숨김 처리
              </button>
            </div>

            {/* 페이지네이션 */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMainPage;

