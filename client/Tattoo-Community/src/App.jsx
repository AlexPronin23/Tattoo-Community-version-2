// React
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { userAuth } from "./slices/userSlice";
import { useEffect } from "react";
import { getStyles } from "./slices/styleSlice";
import { checkWorkSheet, resetMasterState } from "./slices/tattooMastersSlice";
import { getOrderCount } from "./slices/orderSlice";
import { showPopup, hidePopup } from "./slices/popupSlice";

// Pages
import DefaultLayout from "./layouts/DefaultLayout";
import PageLayout from "./layouts/PageLayout";
import PageNotExists from "./components/PageNotExists/PageNotExists";
import FormLogIn from "./pages/FormLogIn";
import FormSignIn from "./pages/FormSignIn";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Profile from "./pages/Profile";
import FormCreate from "./pages/FormCreate";
import MasterPage from "./pages/MasterPage";
import FormEdit from "./pages/FormEdit";
import FormEditPersonal from "./pages/FormEditPersonal";
import PopUp from "./components/PopUp/PopUp";
import Modal from "./components/Modal/Modal";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  const location = useLocation();

  useEffect(() => {
    dispatch(userAuth());
    dispatch(getStyles());
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser) {
      dispatch(resetMasterState());
      return;
    }

    const isMaster = currentUser.status === true || currentUser.status === 1;

    if (isMaster && !location.pathname.startsWith("/master/")) {
      dispatch(checkWorkSheet());
    } else {
      dispatch(resetMasterState());
    }
  }, [dispatch, currentUser, location.pathname]);

  useEffect(() => {
    async function fetchOrderCount() {
      if (currentUser?.status) {
        const resultAction = await dispatch(getOrderCount());
        if (getOrderCount.fulfilled.match(resultAction)) {
          const count = resultAction.payload.orderCount;

          if (count > 0) {
            setTimeout(() => {
              dispatch(
                showPopup({
                  type: "success",
                  message: `У вас ${count} записи. Проверьте личный кабинет`,
                }),
              );

              setTimeout(() => {
                dispatch(hidePopup());
              }, 2500);
            }, 3000);
          }
        }
      }
    }

    fetchOrderCount();
  }, [dispatch, currentUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />} />

        <Route element={<PageLayout />}>
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

          <Route
            path={"/edit/:id"}
            element={
              <ProtectedRoutes>
                <FormEdit />
              </ProtectedRoutes>
            }
          />
          <Route
            path={"/personal/edit/:id"}
            element={
              <ProtectedRoutes>
                <FormEditPersonal />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="*" element={<PageNotExists />} />
      </Routes>

      <PopUp />
      <Modal />
    </>
  );
}

export default App;
