import './style.scss'

const Community = () => {
    return ( 

        <section className="community">

            <div className="container">

                <div className="community_content">

                    <h1 className="title community_title">Сообщество</h1>

                    {/* Part about Chat */}

                    <div className="community_first_question">

                    <p className="community_chat">О чем чат?</p>

                    <p className="community_chat-descr">Обмен опытом, разбор кейсов, обсуждение техники , <br /> 
                    материалов, стерилизации, риска и безопасности
                    </p>

                    </div>

                    {/* Part about useful */}

                    <div className="community_second_question">

                    <p className="community_useful">Кому будет полезен?</p>

                    <p className="community_useful-descr">Мастерам любого уровня и похожим специалистам —  <br /> 
                    ученикам, арт-директорам, владельцам студий и <br /> поставщикам материалов.

                    </p>
                    
                    </div>
                    
                   

                    <button className="button community_btn">Присоединяйся </button>

                </div>

            </div>

        </section>

     );
}
 
export default Community;