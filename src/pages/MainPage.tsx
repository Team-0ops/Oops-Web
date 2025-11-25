import { Banner } from "../components/MainPage/Banner";
import { CategorytList } from "../components/MainPage/CategoryList";
import { PostList } from "../components/MainPage/PostList";

export const MainPage = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-[2.5rem] pt-[1.31rem]">
        <Banner />
        <PostList />
        {/* 즐겨찾기 포스트 리스트인 부분인데 이부분은 props로 넣어서 공통으로 사용할지 따로 컴포넌트를 뺄지 고민중입니다. */}
        {/* TODO: 즐겨찾기 포스트 리스트 컴포넌트 생성: props 넣기 */}
        <PostList />
        <CategorytList />
      </div>
    </>
  );
};

export default MainPage;
