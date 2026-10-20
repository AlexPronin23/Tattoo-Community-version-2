import "./style.scss";

const Community = () => {
  return (
    <section className="community">
      <div className="container">
        <div className="community__content">
          <h1 className="title community__title">Сообщество</h1>

          {/* Part about Chat */}

          <div className="community__first__question">
            <p className="community__chat">О чем чат?</p>

            <p className="community__chat__descr">
              Обмен опытом, разбор кейсов, обсуждение техники , <br />
              материалов, стерилизации, риска и безопасности
            </p>
          </div>

          {/* Part about useful */}

          <div className="community__second__question">
            <p className="community__useful">Кому будет полезен?</p>

            <p className="community__useful__descr">
              Мастерам любого уровня и похожим специалистам — <br />
              ученикам, арт-директорам, владельцам студий и <br /> поставщикам
              материалов.
            </p>
          </div>

          <button className="button community__btn">Присоединяйся </button>
        </div>
      </div>
    </section>
  );
};

export default Community;
