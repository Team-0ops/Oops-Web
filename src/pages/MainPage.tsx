import { Banner } from "../components/MainPage/Banner";
import { CategoryList } from "../components/MainPage/CategoryList";
import { BestFailerList } from "../components/MainPage/BestFailerList.tsx";
import {FavoriteList} from "../components/MainPage/FavoriteList.tsx";

export const MainPage = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-20">
          <Banner />
          <BestFailerList />
          <FavoriteList />
          <CategoryList />
      </div>
    </>
  );
};

export default MainPage;
