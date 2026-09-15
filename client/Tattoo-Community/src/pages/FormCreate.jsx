import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createWorkSheet } from "../slices/tattooMastersSlice";
const FormCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { styles } = useSelector((state) => state.styles);

  const [masterInfo, setMasterInfo] = useState({
    firstName: "",
    lastName: "",
    experience: "",
    isColored: false,
    isAtHome: false,
    tattooSalon: "",
    styleIds: [],
    description: "",
  });

  const {
    firstName,
    lastName,
    experience,
    isColored,
    isAtHome,
    tattooSalon,
    styleIds,
    description,
  } = masterInfo;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMasterInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) =>
      Number(opt.value),
    );
    setMasterInfo((prev) => ({ ...prev, styleIds: selected }));
  };

  const fetchCreateWorkSheet = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(createWorkSheet({ masterInfo }));
      if (createWorkSheet.fulfilled.match(resultAction)) {
        alert(resultAction.payload.message);
        setMasterInfo({
          firstName: "",
          lastName: "",
          experience: "",
          isColored: false,
          isAtHome: false,
          tattooSalon: "",
          styleIds: [],
          description: "",
        });
        navigate("/profile", { replace: true });
      } else if (createWorkSheet.rejected.match(resultAction)) {
        alert(resultAction.payload.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form">
      <div className="container">
        <h2 className="title form__title">Создание анкеты мастера</h2>

        <form onSubmit={fetchCreateWorkSheet}>
          <div className="form__inner">
            <div className="form__column">
              <label className="form__label">Имя: </label>

              <input
                type="text"
                required
                placeholder="Введите имя"
                maxLength={20}
                name="firstName"
                value={firstName}
                className="form__input"
                onChange={handleChange}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Фамилия: </label>

              <input
                type="text"
                required
                placeholder="Введите фамилию"
                maxLength={16}
                name="lastName"
                value={lastName}
                className="form__input"
                onChange={handleChange}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Опыт: </label>
              <input
                type="text"
                required
                placeholder="Введите ваш опыт"
                maxLength={2}
                name="experience"
                value={experience}
                className="form__input"
                onChange={handleChange}
              />
              <p className="form__label">Лет/года</p>
            </div>

            <div className="form__column">
              <label className="form__label">Используете цветные краски?</label>

              <input
                type="checkbox"
                checked={isColored}
                required
                name="isColored"
                className="form__input form__input-checkbox"
                onChange={handleChange}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Работаете в тату салоне?</label>

              <input
                type="checkbox"
                checked={isAtHome}
                name="isAtHome"
                className="form__input form__input-checkbox"
                onChange={handleChange}
              />
            </div>

            <div
              className={`form__column form__column-salon ${isAtHome ? "open" : ""}`}
            >
              <label className="form__label">Тату салон: </label>

              <input
                type="text"
                // required
                placeholder="Введите название тату салона"
                name="tattooSalon"
                value={tattooSalon}
                className="form__input "
                onChange={handleChange}
              />
            </div>

            <div className="form__column">
              <label className="form__label">Стили:</label>

              <select
                multiple
                value={styleIds}
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
                value={description}
                name="description"
                placeholder="Расскажите о себе"
                maxLength={255}
                onChange={handleChange}
              ></textarea>
              {/* <p className="form__count">Кол-во символов : {text.length}</p> */}
            </div>

            <button type="submit" className="button btn-login">
              Создать
            </button>
            <Link to={"/profile"} className="form__link">
              Назад
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormCreate;
