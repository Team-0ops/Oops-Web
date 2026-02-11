import "./App.css";
import PublicLayout from "./layout/PublicLayout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";
import LogInPage from "./pages/LogInPage.tsx";
import SignUpPage from "./pages/SignUp/SignUpPage.tsx";
import SearchPage from "./pages/SearchPage";
import { AuthProvider } from "./context/AuthContext.tsx";
import PostWrite from "./pages/Post/PostWritePage.tsx";
import PostSuccess from "./pages/Post/PostSuccess.tsx";
import RandomFeedPage from "./pages/RandomFeedPage.tsx";
import LuckyDrawPage from "./pages/LuckyDrawPage.tsx";
import  MyPageLayout  from "./pages/MyPage/MyPageLayout.tsx";
import PostDetailPage from "./pages/Post/PostDetailPage.tsx";
import AdminMainPage from "./pages/Admin/AdminMainPage.tsx";
import PostReportDetailPage from "./pages/Admin/PostReportDetailPage.tsx";
import CommentReportDetailPage from "./pages/Admin/CommentReportDetailPage.tsx";
import UserDetailPage from "./pages/Admin/UserDetailPage.tsx";
import ServiceTerm from "./components/Terms/ServiceTerm.tsx";
import PrivacyTerms from "./components/Terms/PrivacyTerms.tsx";
import MarketingTerm from "./components/Terms/Marketing.tsx";
import ProfileEditPage from "./pages/MyPage/ProfileEditPage.tsx";
import MyPostPage from "./pages/MyPage/MyPostPage.tsx";
import MyLessonPage from "./pages/MyPage/MyLessonPage.tsx";

//로그인 구현 필요 없이 들어가는 페이지 라우터
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        // path : "" 와 동일함  -> 하지만 react 에서 index: true를 적극 권장
        index: true,
        element: <MainPage />,
      },
      {
        path: "login",
        element: <LogInPage />,
      },
      //TODO: login 사항 없도록 라우터 분리
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "terms1",
        element: <ServiceTerm />,
      },
      {
        path: "terms2",
        element: <PrivacyTerms />,
      },
      {
        path: "terms3",
        element: <MarketingTerm />,
      },
      /////////////////////////
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "random-feed",
        element: <RandomFeedPage />,
      },
      {
        path: "lucky-draw",
        element: <LuckyDrawPage />,
      },
      {
        path: "my-profile",
        element: <MyPageLayout />,
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <ProfileEditPage /> },
          { path: "posts", element: <MyPostPage /> },
          { path: "lessons", element: <MyLessonPage /> },
        ],
      },
      // 설정한 path 이외에 모든 Path 에 대해 ErrorPage 랜더링
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "post",
        element: <PostWrite />,
      },
      {
        path: "post/success",
        element: <PostSuccess />,
      },
      {
        path: "posts/:postId",
        element: <PostDetailPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminMainPage />,
  },
  {
    path: "/admin/post-report/:id",
    element: <PostReportDetailPage />,
  },
  {
    path: "/admin/comment-report/:id",
    element: <CommentReportDetailPage />,
  },
  {
    path: "/admin/user/:id",
    element: <UserDetailPage />,
  },
];

//router 생성 : 이후 portected를 위해 배열로 넣음
const router = createBrowserRouter([...publicRoutes]);

/* 
  useQueryClient 사용을 위해 코드 생성 후 주석 처리
  export const queryClient = new QueryClient(); 
*/

// 이후 쿼리, authprovider 사용을 위해 주석 처리
function App() {
  return (
    <>
      <AuthProvider>
        {/* <QueryClientProvider client={queryClient} */}
        <RouterProvider router={router} />
        {/* </QueryClientProvider> */}
      </AuthProvider>
    </>
  );
}

export default App;
