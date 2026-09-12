import { Link } from "react-router";
const FormCreate = () => {
  return (
    <div className="form">
      <div className="container">
        <h2 className="title form__title">Создание портфолио</h2>

        <form>
          <div className="form__inner">
            <div className="form__column">
              <label className="form__label">Имя: </label>

              <input
                type="text"
                required
                placeholder="Введите имя"
                maxLength={20}
                name="firstName"
                className="form__input"
              />
            </div>

            <div className="form__column">
              <label className="form__label">Фамииля: </label>

              <input
                type="text"
                required
                placeholder="Введите фамилию"
                maxLength={16}
                name="lastName"
                className="form__input"
              />
            </div>

            <div className="form__column">
              <label className="form__label">Опыт: </label>

              <input
                type="text"
                required
                placeholder="Введите ваш опыт"
                maxLength={16}
                name="experience"
                className="form__input"
              />
            </div>

            <div className="form__column">
              <label className="form__label">Используете цветные краски?</label>

              <input
                type="checkbox"
                required
                className="form__input form__input-checkbox"
              />
            </div>

            <div className="form__column">
              <label className="form__label">Работаете в тату салоне?</label>

              <input
                type="checkbox"
                required
                className="form__input form__input-checkbox"
              />
            </div>

            <div className="form__column">
              <label className="form__label">Стили:</label>

              <select className="form__select">
                <option>Крутой</option>
              </select>
            </div>

            <div className="form__upload-section">
              <h3 className="form__upload-title">Приложите свои работы</h3>

              <div className="form__upload-grid">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="form__upload-item">
                    <input
                      type="file"
                      id={`file-upload-${index}`}
                      className="form__file-input"
                      accept="image/*"
                    />
                    <label
                      htmlFor={`file-upload-${index}`}
                      className="form__file-label"
                    >
                      <span className="form__plus">+</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="button btn-login">
              Войти
            </button>
            {/* <Link to={"/profile"} className="form__link">
              Назад
            </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCreate;
