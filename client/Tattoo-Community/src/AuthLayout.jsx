import { Routes, Route } from "react-router-dom";

import FormLogIn from "./pages/FormLogIn";
import FormSignIn from "./pages/FormSignIn";

const AuthLayout = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<FormLogIn />} />
        <Route path="/register" element={<FormSignIn />} />
      </Routes>
    </>
  );
};

export default AuthLayout;
