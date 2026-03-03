import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";

import { ProtectedRoute } from "./ProtectedRoute";

import PostWrite from "../pages/Post/PostWritePage";
import PostSuccess from "../pages/Post/PostSuccess";
import PostEditPage from "../pages/Post/PostEditPage";

import MyPageLayout from "../pages/MyPage/MyPageLayout";
import ProfileEditPage from "../pages/MyPage/ProfileEditPage";
import MyPostPage from "../pages/MyPage/MyPostPage";
import MyLessonPage from "../pages/MyPage/MyLessonPage";

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      // 글쓰기
      {
        path: "post",
        element: (
          <ProtectedRoute>
            <PostWrite />
          </ProtectedRoute>
        ),
      },
      // 작성 성공
      {
        path: "post/success",
        element: (
          <ProtectedRoute>
            <PostSuccess />
          </ProtectedRoute>
        ),
      },
      // 수정
      {
        path: "posts/edit/:postId",
        element: (
          <ProtectedRoute>
            <PostEditPage />
          </ProtectedRoute>
        ),
      },

      // 마이페이지 전체 보호
      {
        path: "my-profile",
        element: (
          <ProtectedRoute>
            <MyPageLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <ProfileEditPage /> },
          { path: "posts", element: <MyPostPage /> },
          { path: "lessons", element: <MyLessonPage /> },
        ],
      },
    ],
  },
];