import { UserReportHistoryItem } from "../../mocks/adminReportData";

interface UserReportHistoryTableProps {
  data: UserReportHistoryItem[];
}

export const UserReportHistoryTable = ({
  data,
}: UserReportHistoryTableProps) => {
  return (
    <div className="w-full">
      <h3 className="h2 text-[#262627] mb-4">신고 내역</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-[#E6F3D7]">
              <th className="px-4 py-3 text-center body2 text-[#262627]">
                신고자
              </th>
              <th className="px-4 py-3 text-center body2 text-[#262627]">
                유형
              </th>
              <th className="px-4 py-3 text-center body2 text-[#262627]">
                신고 번호
              </th>
              <th className="px-4 py-3 text-center body2 text-[#262627]">
                신고 날짜
              </th>
              <th className="px-4 py-3 text-center body2 text-[#262627]">
                신고 사유
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={`${item.reporter}-${item.reportId}-${index}`}
                className="border-b border-[#E4E4E4] hover:bg-[#FAFAFA]"
              >
                <td className="px-4 py-3 text-center body3 text-[#262627]">
                  {item.reporter}
                </td>
                <td className="px-4 py-3 text-center body3 text-[#262627]">
                  {item.type}
                </td>
                <td className="px-4 py-3 text-center body3 text-[#262627]">
                  {item.reportId}
                </td>
                <td className="px-4 py-3 text-center body3 text-[#262627]">
                  {item.reportDate}
                </td>
                <td className="px-4 py-3 text-center body3 text-[#262627]">
                  {item.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserReportHistoryTable;



