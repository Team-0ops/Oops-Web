// import {PostCard} from "../common/PostCard.tsx";
import NextArrow from "../../assets/icons/NextArrow.svg?react";
import Star from "../../assets/icons/Star.svg?react";

export const FavoriteList = () => {
    return (
        <>
            <div className="flex flex-col gap-10">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        <Star/>
                        <div className="flex flex-col gap-2">
                            <div className="h1">즐겨찾기 한 카테고리</div>
                            <div className="body2 text-[#464646]">즐겨찾기한 카테고리를 어떤 기준으로 3개선정</div>
                        </div>
                    </div>
                    <button className="body3 flex items-center gap-2 hover:underline text-[#6F6F6F]">
                        전체 보기
                        <NextArrow/>
                    </button>
                </div>
                <div className="flex border-b border-[#D2D2D2]">
                    ㅇㅇㅇ
                </div>
                <div className="flex flex-col gap-7.5">

                </div>
            </div>
        </>
    );
};
