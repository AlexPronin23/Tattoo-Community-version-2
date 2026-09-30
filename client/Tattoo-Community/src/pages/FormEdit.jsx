import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router";
import { updateWorkSheet } from "../slices/tattooMastersSlice";
const FormEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { styles } = useSelector((state) => state.styles);
  const { id } = useParams();
  const { currentMaster, message } = useSelector(
    (state) => state.tattooMasters,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSucces, setIsSucces] = useState(false);

  const [newMasterInfo, setNewMasterInfo] = useState({
    newFirstName: "",
    newLastName: "",
    newExperience: "",
    newTattooSalon: "",
    newIsColored: false,
    newIsAtHome: false,
    newDescription: "",
    newStyles: [],
  });

  // Заполняем форму при загрузке currentMaster
  useEffect(() => {
    if (currentMaster) {
      setNewMasterInfo({
        newFirstName: first_name || "",
        newLastName: last_name || "",
        newExperience: experience || "",
        newTattooSalon: tattooSalon || "",
        newIsColored: isColored || false,
        newIsAtHome: isAtHome || false,
        newDescription: description || "",
        newStyles: currentMaster.styles?.map((s) => s.style_id) || [],
      });
    }
  }, [currentMaster]);

  const {
    first_name,
    last_name,
    experience,
    tattooSalon,
    isColored,
    isAtHome,
    description,
  } = currentMaster || {};

  const {
    newFirstName,
    newLastName,
    newExperience,
    newTattooSalon,
    newIsColored,
    newIsAtHome,
    newDescription,
    newStyles,
  } = newMasterInfo;

  const currentIds = currentMaster?.styles?.map((s) => s.style_id) || [];

  const isSame =
    currentIds.length === newStyles.length &&
    newStyles.every((id) => currentIds.includes(id));

  const handleType = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMasterInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) =>
      Number(opt.value),
    );
    setNewMasterInfo((prev) => ({
      ...prev,
      newStyles: selected,
    }));
  };

  const fetchUpdateMasterInfo = async (e) => {
    e.preventDefault();

    if (newStyles.length === 0) {
      alert("Выберите хотя бы один стиль");
      return;
    }

    if (isSame) {
      alert("Эти стили были уже выбраны вами ранее");
      return;
    }

    try {
      const resultAction = await dispatch(
        updateWorkSheet({ id, newMasterInfo }),
      );

      if (updateWorkSheet.fulfilled.match(resultAction)) {
        setIsSucces(true);
        setOpen(true);
      } else if (updateWorkSheet.rejected.match(resultAction)) {
        setIsSucces(false);
        setOpen(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleOk = () => {
    setOpen(false);
    if (isSucces) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 1500);
    }
  };

  return (
    <div className="form">
      <div className="container">
        <h2 className="title form__title">Изменение анкеты</h2>

        <form onSubmit={fetchUpdateMasterInfo}>
          <div className="form__inner">
            <div className="form__column">
              <label className="form__label">Имя: </label>

              <input
                type="text"
                required
                value={newFirstName}
                placeholder="Введите имя"
                maxLength={20}
                name="newFirstName"
                className="form__input"
                onChange={handleType}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Фамилия: </label>

              <input
                type="text"
                required
                value={newLastName}
                placeholder="Введите фамилию"
                maxLength={16}
                name="newLastName"
                className="form__input"
                onChange={handleType}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Опыт: </label>
              <input
                type="text"
                required
                value={newExperience}
                placeholder="Введите ваш опыт"
                maxLength={2}
                name="newExperience"
                className="form__input"
                onChange={handleType}
              />
              <p className="form__label">Лет/года</p>
            </div>

            <div className="form__column">
              <label className="form__label">Используете цветные краски?</label>

              <input
                checked={newIsColored}
                type="checkbox"
                name="newIsColored"
                className="form__input form__input-checkbox"
                onChange={handleType}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Работаете в тату салоне?</label>

              <input
                checked={newIsAtHome}
                type="checkbox"
                name="newIsAtHome"
                className="form__input form__input-checkbox"
                onChange={handleType}
              />
            </div>

            <div
              className={`form__column form__column-salon ${newIsAtHome ? "open" : ""}`}
            >
              <label className="form__label">Тату салон: </label>

              <input
                type="text"
                // required
                value={newTattooSalon}
                placeholder="Введите название тату салона"
                name="newTattooSalon"
                className="form__input "
                onChange={handleType}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Стили:</label>

              <select
                multiple
                value={newStyles}
                className="form__select"
                onChange={handleSelect}
              >
                {styles.map((style) => (
                  <option
                    className="form__option"
                    key={style.style_id}
                    value={style.style_id}
                  >
                    {style.name}
                  </option>
                ))}
              </select>

              <div className="form__help">
                <span>?</span>

                <div className="form__tooltip">
                  <ul className="form__items">
                    <li className="form__item">
                      Чтоб выбрать несколько стилей, используйте CTRL + ЛКМ
                    </li>
                    <li className="form__item">
                      Чтоб отменить выбор, нажмите на любой стиль
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form__column">
              <label className="form__label">О себе: </label>

              <textarea
                className="form__textarea"
                required
                value={newDescription}
                name="newDescription"
                placeholder="Расскажите о себе"
                maxLength={255}
                onChange={handleType}
              ></textarea>
              {/* <p className="form__count">Кол-во символов : {text.length}</p> */}
            </div>

            <button type="submit" className="button btn-login">
              Изменить
            </button>
            <Link to={"/profile"} className="form__link">
              Назад
            </Link>
          </div>
        </form>
      </div>
      {/* Loading screen */}
      <div className={`form__loading ${isLoading ? "open" : ""}`}>
        <div className="spinner"></div>
      </div>
      {/* Popup */}
      <div className={`form__popup ${open ? "open" : ""}`}>
        <p className="form__popup__text">{message}</p>
        <button className="button btn-cancel" onClick={handleOk}>
          Хорошо
        </button>
      </div>
    </div>
  );
};

export default FormEdit;
