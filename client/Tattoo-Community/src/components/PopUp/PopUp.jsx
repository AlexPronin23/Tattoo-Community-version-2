import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
const PopUp = () => {
  const { open, message, type } = useSelector((state) => state.popup);

  return (
    <div className={`popup ${open ? "open" : ""} popup--${type}`}>
      <p className="popup__text">{message}</p>
    </div>
  );
};

export default PopUp;
