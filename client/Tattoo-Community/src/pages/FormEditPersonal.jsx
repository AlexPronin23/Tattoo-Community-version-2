import { Link, useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userEditData } from "../slices/userSlice";
import { showPopup, hidePopup } from "../slices/popupSlice";

const FormEditPersonal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.users);
  const { email, phone } = currentUser;
  const [newUserInfo, setNewUserInfo] = useState({
    newEmail: "",
    newPhone: "",
    newPassword: "",
    newStatus: false,
  });
  const { newEmail, newPhone, newPassword } = newUserInfo;
  const [isOpen, setIsOpen] = useState(false);
  const [isTattooMaster, setIsTattooMaster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setNewUserInfo({
        newEmail: email,
        newPhone: phone,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUserEditData = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        userEditData({
          id,
          newEmail,
          newPhone,
          newPassword,
          newStatus: isTattooMaster,
        }),
      );

      if (userEditData.fulfilled.match(resultAction)) {
        setNewUserInfo({
          newEmail: "",
          newPhone: "",
          newPassword: "",
          newStatus: false,
        });

        dispatch(
          showPopup({
            message: resultAction.payload.message,
            type: "success",
          }),
        );

        setTimeout(() => {
          setIsLoading(true);
          dispatch(hidePopup());
        }, 3000);

        setTimeout(() => {
          navigate("/profile", { replace: true });
        }, 3500);
      } else if (userEditData.rejected.match(resultAction)) {
        dispatch(
          showPopup({
            message: resultAction.payload.message,
            type: "error",
          }),
        );

        setTimeout(() => {
          dispatch(hidePopup());
        }, 3000);
      }
      console.error(resultAction.payload.message);
    } catch (error) {
      alert("Произошла ошибка");
    }
  };

  return (
    <div className="form">
      <div className="container">
        <h2 className="title form__title">Изменение персональных данных</h2>

        <form onSubmit={fetchUserEditData}>
          <div className="form__inner">
            <div className="form__column">
              <label className="form__label">Email: </label>

              <input
                type="email"
                value={newEmail}
                required
                placeholder="Введите новый email"
                maxLength={254}
                className="form__input"
                name="newEmail"
                onChange={handleChange}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Телефон: </label>

              <input
                type="tel"
                value={newPhone}
                placeholder="+7 (___) ___-__-__"
                maxLength={15}
                className="form__input"
                name="newPhone"
                onChange={handleChange}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Пароль: </label>

              <div className="form__password">
                <input
                  type={isOpen ? "text" : "password"}
                  value={newPassword}
                  placeholder="Введите новый  пароль"
                  minLength={8}
                  maxLength={16}
                  className="form__input"
                  name="newPassword"
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="form__toggle"
                ></button>
              </div>
            </div>

            <div className="form__column">
              <label className="form__label"> Тату мастер? </label>

              <input
                type="checkbox"
                checked={isTattooMaster}
                className="form__input form__input-checkbox"
                onChange={() => setIsTattooMaster((prev) => !prev)}
              />

              <div className="form__help">
                <span>?</span>

                <div className="form__tooltip">
                  <ul className="form__items">
                    <li className="form__item">
                      Если поставили галочку,то получаете доступ к личному
                      профилю
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button type="submit" className="button btn-reg">
              Изменить
            </button>

            <Link to={"/profile"} className="form__link">
              Назад
            </Link>
          </div>
        </form>
        {/* Loading screen */}
        <div className={`form__loading ${isLoading ? "open" : ""}`}>
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default FormEditPersonal;
