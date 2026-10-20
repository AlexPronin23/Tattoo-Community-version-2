import "./style.scss";

// Images
import MastersCard from "../Cards/MastersCard/MastersCard";

// React
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getMastersLimit, setPage } from "../../slices/paginationSlice";

// Components
import Skeleton from "../Skeleton/CardSkeleton";

const Masters = () => {
  const dispatch = useDispatch();
  const mastersLimit = useSelector((state) => state.pagination.mastersLimit);
  const { page, totalPages, limit, status, error } = useSelector(
    (state) => state.pagination,
  );

  useEffect(() => {
    dispatch(getMastersLimit({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <section className="masters">
      <div className="container">
        <div className="masters__wrapper">
          <h1 className="title masters__title">Тату мастера</h1>

          <div className="masters__card">
            {error ? (
              <>
                <h1>{error.message || "Ошибка"}</h1>
              </>
            ) : status === "Загрузка" ? (
              <>
                {[...Array(2)].map(() => (
                  <Skeleton />
                ))}
              </>
            ) : (
              mastersLimit.map((master) => (
                <MastersCard key={master.user_id} {...master} />
              ))
            )}
          </div>

          <div className="masters__pagination">
            <div className="masters__pagination__content">
              <button
                disabled={page === 1}
                className="button btn-previous"
                onClick={() => dispatch(setPage(page - 1))}
              >
                ←
              </button>
              <p className="masters__pagination__pages">
                {page} из {totalPages}
              </p>
              <button
                disabled={page === totalPages}
                className="button btn-next"
                onClick={() => dispatch(setPage(page + 1))}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Masters;
