// Styles
import "./style.scss";

// React
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Redux
import { getMasterServices } from "../../slices/serviceSlice";

const Table = () => {
  const dispatch = useDispatch();
  const { masterServices } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getMasterServices());
  }, [dispatch]);

  return (
    <div className="table">
      <div className="container">
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
      </div>
    </div>
  );
};

export default Table;
