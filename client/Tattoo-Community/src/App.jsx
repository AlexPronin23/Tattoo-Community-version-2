import { Routes, Route, useLocation } from "react-router-dom";

import DefaultLayout from "./DefaultLayout";
import AuthLayout from "./AuthLayout";
import PageNotExists from "./components/PageNotExists/PageNotExists";

function App() {
  return (
    <>
      <AppContent />
    </>
  );
}

const AppContent = () => {
  const location = useLocation(); // Получаем местоположение url
  const isAuthPage = ["/login", "/register", "/profile"].includes(
    location.pathname,
  ); // проверяем наличие url адреса

  return <>{isAuthPage ? <AuthLayout /> : <DefaultLayout />}</>;
};

export default App;
