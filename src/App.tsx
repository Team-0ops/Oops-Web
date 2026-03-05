import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { publicRoutes } from "./routes/publicRoutes";
import { protectedRoutes } from "./routes/protectedRoutes";


const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;