import "./App.css";
import { MediaQueryProvider } from "./context/MediaQueryContext";
import PublicLayout from "./layout/PublicLayout";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
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
        element: <LoginPage />,
      },
      // 설정한 path 이외에 모든 Path 에 대해 ErrorPage 랜더링
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
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
      {/* <QueryClientProvider client={queryClient}>
      <AuthProvider> */}
      {/*미디어 쿼리 provider 화면 크기에 따라 context API 수정 */}
      <MediaQueryProvider>
        <RouterProvider router={router} />
      </MediaQueryProvider>
      {/* </AuthProvider>
      </QueryClientProvider> */}
    </>
  );
}

export default App;
