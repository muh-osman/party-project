//React router
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// Pages & Components
import { Home, Layout, About, SignUp, LogIn, Admin, AdminLayout, Scan, DashboardLayout, Dashboard, Statistics, ProtectedRoutes } from "./_index";



export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="joinus" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />

          {/*  Protected Routes  */}
          <Route element={< ProtectedRoutes />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path="scan" element={<Scan />} />
              <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="statistics" element={<Statistics />} />
              </Route>
            </Route>
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
