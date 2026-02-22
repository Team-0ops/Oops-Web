import { useNavigate } from "react-router-dom";
import { UserReportedData } from "../../mocks/adminReportData";
import Checkbox from "../common/Checkbox";

interface UserReportedTableProps {
  data: UserReportedData[];
  selectedIds: number[];
  onCheckboxChange: (id: number) => void;
  onSelectAll: () => void;
}

export const UserReportedTable = ({
  data,
  selectedIds,
  onCheckboxChange,
  onSelectAll,
}: UserReportedTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (userId: number) => {
    navigate(`/admin/user/${userId}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="overflow-x-auto px-4 py-4">
        <table className="w-full table-fixed">
          {/* 테이블 헤더 */}
          <thead>
            <tr className="bg-[#E6F3D7]">
              <th className="w-16 px-4 py-3 text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={selectedIds.length === data.length && data.length > 0}
                    onChange={onSelectAll}
                  />
                </div>
              </th>
              <th className="w-32 px-4 py-3 text-center body2 text-[#262627]">
                신고 수
              </th>
              <th className="w-32 px-4 py-3 text-center body2 text-[#262627]">
                유저 번호
              </th>
              <th className="px-4 py-3 text-center body2 text-[#262627]">
                유저 닉네임
              </th>
            </tr>
          </thead>

          {/* 테이블 바디 */}
          <tbody>
            {data.map((item, index) => (
              <tr
                key={`${item.userId}-${index}`}
                className="border-b border-[#E4E4E4] hover:bg-[#FAFAFA] cursor-pointer"
                onClick={() => handleRowClick(item.userId)}
              >
                <td
                  className="w-16 px-4 py-3 text-center"
                  onClick={handleCheckboxClick}
                >
                  <div className="flex justify-center">
                    <Checkbox
                      checked={selectedIds.includes(item.userId)}
                      onChange={() => onCheckboxChange(item.userId)}
                    />
                  </div>
                </td>
                <td className="w-32 px-4 py-3 text-center body3 text-[#262627]">
                  {item.reportCount}
                </td>
                <td className="w-32 px-4 py-3 text-center body3 text-[#262627]">
                  {item.userId}
                </td>
                <td className="px-4 py-3 text-center body3 text-[#262627]">
                  {item.nickname}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserReportedTable;

