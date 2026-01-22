import Pin from "../../assets/icons/Pin.svg?react";
import {CategoryPostList} from "./CategoryPostList.tsx";

export const CategoryList = () => {
    return (
        <>
            <div className="flex flex-col gap-10">
                <div className="flex justify-between items-end pb-6 border-b border-b-[#D2D2D2]">
                    <div className="flex flex-col gap-4">
                        <Pin/>
                        <div className="h1">주제별 피드</div>
                    </div>
                    <button className="body3 flex hover:underline text-[#6F6F6F]">
                        전체 보기
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-x-22 gap-y-10">
                    <CategoryPostList />
                    <CategoryPostList />
                    <CategoryPostList />
                    <CategoryPostList />
                    <CategoryPostList />
                    <CategoryPostList />
                    <CategoryPostList />
                    <CategoryPostList />
                    <CategoryPostList />
                </div>
            </div>
        </>
    );
};
