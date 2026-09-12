import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAuth } from "./slices/userSlice";

import DefaultLayout from "./DefaultLayout";
import AuthLayout from "./AuthLayout";
import PageNotExists from "./components/PageNotExists/PageNotExists";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAuth());
  }, [dispatch]);
  return (
    <>
      <AppContent />
    </>
  );
}

const AppContent = () => {
  const location = useLocation(); // Получаем местоположение url
  const isAuthPage = ["/login", "/register", "/profile", "/create"].includes(
    location.pathname,
  ); // проверяем наличие url адреса

  return <>{isAuthPage ? <AuthLayout /> : <DefaultLayout />}</>;
};

export default App;
