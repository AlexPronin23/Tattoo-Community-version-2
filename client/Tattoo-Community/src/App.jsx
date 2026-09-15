import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "./slices/userSlice";
import { getStyles } from "./slices/styleSlice";
import { checkWorkSheet, resetMasterState } from "./slices/tattooMastersSlice";

import DefaultLayout from "./DefaultLayout";
import AuthLayout from "./AuthLayout";
// import PageNotExists from "./components/PageNotExists/PageNotExists";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    dispatch(userAuth());
    dispatch(getStyles());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(checkWorkSheet());
    } else {
      dispatch(resetMasterState);
    }
  }, [dispatch, currentUser]);

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
