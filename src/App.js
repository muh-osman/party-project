//React router
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// Pages & Components
import { Home, Layout, About, SignUp, LogIn, Admin, Scan, Dashboard, ProtectedRoutes } from "./_index";



export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />

          {/*  Protected Routes  */}
          <Route element={< ProtectedRoutes />}>
              <Route path="admin" element={<Admin />} />
              <Route path="scan" element={<Scan />} />
              <Route path="dashboard" element={<Dashboard />} />
          </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
