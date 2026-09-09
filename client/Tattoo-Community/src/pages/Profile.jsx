import "./style.scss";
const Profile = () => {
  return (
    <div className="profile">
      <div className="container">
        <div className="profile__content">
          <h1 className="title profile__title">Личный кабинет</h1>
          <div className="profile__tabs">
            <button className="button btn__tabs">Личные данные</button>
            <button className="button btn__tabs">Портфолио</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
