import type { RouteObject } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";

import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import SearchPage from "../pages/SearchPage";

import RandomFeedPage from "../pages/RandomFeedPage";
import LuckyDrawPage from "../pages/LuckyDrawPage";
import FavoriteFeedPage from "../pages/FavoriteFeedPage";
import CategoryFeedPage from "../pages/CategoryFeedPage";
import BestFeedPage from "../pages/BestFeedPage";

import ServiceTerm from "../components/Terms/ServiceTerm";
import PrivacyTerms from "../components/Terms/PrivacyTerms";
import MarketingTerm from "../components/Terms/Marketing";

import SignUpPage from "../pages/SignUp/SignUpPage";
import FindPasswordPage from "../pages/FindPasswordPage";
import SetNewPassWordPage from "../pages/SetNewPasswordPage";

import PostDetailPage from "../pages/Post/PostDetailPage";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <MainPage /> },

      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },

      { path: "terms1", element: <ServiceTerm /> },
      { path: "terms2", element: <PrivacyTerms /> },
      { path: "terms3", element: <MarketingTerm /> },

      { path: "signup", element: <SignUpPage /> },
      { path: "find-password", element: <FindPasswordPage /> },
      { path: "set-password", element: <SetNewPassWordPage /> },

      { path: "search", element: <SearchPage /> },
      { path: "random-feed", element: <RandomFeedPage /> },
      { path: "lucky-draw", element: <LuckyDrawPage /> },
      { path: "favorite-feed", element: <FavoriteFeedPage /> },
      { path: "category-feed/:categoryId", element: <CategoryFeedPage /> },
      { path: "best-failer", element: <BestFeedPage /> },

      // 게시글 상세는 공개
      { path: "posts/:postId", element: <PostDetailPage /> },

      // 맨 마지막
      { path: "*", element: <ErrorPage /> },
    ],
  },
];
