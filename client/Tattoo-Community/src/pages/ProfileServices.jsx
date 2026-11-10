// Styles
import "./style.scss";

// React
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// Redux
import { getMasterServices, createServices } from "../slices/serviceSlice";
import { showPopup, hidePopup } from "../slices/popupSlice";

const ProfileServices = () => {
  const dispatch = useDispatch();
  const { services, masterServices } = useSelector((state) => state.service);
  const { created } = useSelector((state) => state.tattooMasters);
  const [serviceId, setServiceId] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  useEffect(() => {
    dispatch(getMasterServices());
  }, [dispatch]);

  const fetchCreateService = async () => {
    if (!created) {
      dispatch(
        showPopup({
          type: "error",
          message: "Вы должны создать анкету!",
        }),
      );

      setTimeout(() => {
        dispatch(hidePopup());
      }, 1500);

      return;
    }

    if (!serviceId || !servicePrice) {
      dispatch(
        showPopup({
          type: "error",
          message: "Выберите услугу и укажите цену",
        }),
      );

      setTimeout(() => {
        dispatch(hidePopup());
      }, 1500);
<<<<<<< HEAD

      return;
=======
>>>>>>> 2af41417cd6e7821a1dfe1b07b5f891962cdfb77
    }

    try {
      const resultAction = await dispatch(
        createServices({
          service_id: Number(serviceId),
          servicePrice: servicePrice,
        }),
      );

      if (createServices.fulfilled.match(resultAction)) {
        setServiceId("");
        setServicePrice("");
        dispatch(getMasterServices());

        dispatch(
          showPopup({
            type: "success",
            message: resultAction.payload.message,
          }),
        );

        setTimeout(() => {
          dispatch(hidePopup());
        }, 3000);
      } else if (createServices.rejected.match(resultAction)) {
        showPopup({
          type: "error",
          message: resultAction.payload,
        });
        setTimeout(() => {
          hidePopup();
        }, 3000);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="profile__services">
      <div className="container">
        <div className="profile__services__content">
          <div className="profile__services__header">
            <h1 className="title profile__services__title">Ваши услуги</h1>
            <p className="profile__services__subtitle">
              Здесь вы можете добавлять новые услуги, и также цену к ним
            </p>
          </div>

          <div className="profile__services__create">
            <div className="profile__services__column">
              <label className="profile__services__label">
                Выберите услугу:
              </label>
              <select
                value={serviceId}
                className="profile__services__select"
                onChange={(e) => setServiceId(e.target.value)}
              >
                <option value="" disabled>
                  Выберите из списка
                </option>
                {services.map((service) => (
                  <option
                    value={service.service_id}
                    key={service.service_id}
                    className="profile__services__option"
                  >
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="profile__services__column">
              <label className="profile__services__label">
                Введите цену услуги:
              </label>
              <input
                type="text"
                className="profile__services__input"
                value={servicePrice}
                placeholder="Введите цену"
                onChange={(e) => setServicePrice(e.target.value)}
              />
            </div>

            <div
              className="button button btn-create"
              type="button"
              onClick={fetchCreateService}
            >
              Создать услугу
            </div>
          </div>

          <div className="profile__services__table">
            {masterServices.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Название услуги</th>
                    <th>Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {masterServices.map((item) => (
                    <tr key={item.service_id}>
                      <td>{item.masterServicesInfo?.name || "Не указано"}</td>
                      <td>{item.servicePrice} руб</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <p className="profile__services__none">
                  У вас пока нет созданных услуг
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileServices;
