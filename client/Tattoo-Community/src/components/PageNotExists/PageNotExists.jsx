import "./style.scss";
const PageNotExists = () => {
  return (
    <div className="error">
      <div className="container">
        <div className="error__wrapper">
          <h1 className="title error__title">Страница не найдена</h1>
        </div>
      </div>
    </div>
  );
};

export default PageNotExists;
