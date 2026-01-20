import { Banner } from "../components/MainPage/Banner";
import { CategorytList } from "../components/MainPage/CategoryList";
import { BestFailerList } from "../components/MainPage/BestFailerList.tsx";

export const MainPage = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-20">
        <Banner />
        <BestFailerList />
        {/* 즐겨찾기 포스트 리스트인 부분인데 이부분은 props로 넣어서 공통으로 사용할지 따로 컴포넌트를 뺄지 고민중입니다. */}
        <BestFailerList />
        <CategorytList />
      </div>
    </>
  );
};

export default MainPage;
