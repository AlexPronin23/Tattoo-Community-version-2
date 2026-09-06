import { Routes, Route } from "react-router-dom";

import FormLogIn from "./pages/FormLogIn";
import FormSignIn from "./pages/FormSignIn";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Profile from "./pages/Profile";

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
      </Routes>
    </>
  );
};

export default AuthLayout;
