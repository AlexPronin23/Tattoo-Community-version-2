import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import FormLogIn from "./pages/FormLogIn";
import FormSignIn from "./pages/FormSignIn";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Profile from "./pages/Profile";
import FormCreate from "./pages/FormCreate";
import MasterPage from "./pages/MasterPage";

const AuthLayout = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<FormLogIn />} />
        <Route path="/register" element={<FormSignIn />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoutes>
              <FormCreate />
            </ProtectedRoutes>
          }
        />

        <Route
          path={"/master/:id"}
          element={
            <ProtectedRoutes>
              <MasterPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AuthLayout;
