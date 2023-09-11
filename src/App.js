//React router
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// Pages & Components
import { Home, Layout, About, SignUp } from "./_index";



export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<SignUp />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
