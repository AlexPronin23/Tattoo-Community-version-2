import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "./slices/userSlice";
import { getStyles } from "./slices/styleSlice";
import { checkWorkSheet, resetMasterState } from "./slices/tattooMastersSlice";
import { resetPortfolio } from "./slices/portfolioSlice";

import DefaultLayout from "./DefaultLayout";
import AuthLayout from "./AuthLayout";
// import PageNotExists from "./components/PageNotExists/PageNotExists";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const location = useLocation();

  useEffect(() => {
    dispatch(userAuth());
    dispatch(getStyles());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && !location.pathname.startsWith("/master/")) {
      dispatch(checkWorkSheet());
    } else {
      dispatch(resetMasterState());
      // dispatch(resetPortfolio());
    }
  }, [dispatch, currentUser, location.pathname]);

  return (
    <>
      <AppContent />
    </>
  );
}

const AppContent = () => {
  const location = useLocation(); // Получаем местоположение url
  const isPage =
    ["/login", "/register", "/profile", "/create", "/master/:id"].includes(
      location.pathname,
    ) || location.pathname.startsWith("/master/"); // проверяем наличие url адреса

  return <>{isPage ? <AuthLayout /> : <DefaultLayout />}</>;
};

export default App;
