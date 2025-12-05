import { ResultList } from "../components/SearchPage/ResultList";
import Search from "../assets/icons/Search.svg?react";

export const SearchPage = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-[2.5rem] xl:gap-[5rem]">
        <div className="flex flex-col items-center gap-[3.12rem] w-[46rem]">
          <div className="h3">검색</div>
          <div className="flex items-center h-[4.12rem] rounded-[0.5rem] bg-[#FBF8F1] w-full px-[1.25rem] py-[1.38rem] border-[1.5px] border-[#EBE7DA]">
            <input
              type="text"
              placeholder="무엇이든 검색해 보세요!"
              className=" body1 flex-1 bg-transparent outline-none"
            />
            <Search className="shrink-0" />
          </div>
        </div>

        <div className="w-full">
          <ResultList />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
