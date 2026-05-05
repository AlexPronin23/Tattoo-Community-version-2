import './style.scss'
const PageNotExists = () => {
    return ( 
        <div className="error">
            <div className="container">
                <div className="error_wrapper">
                    <h1 className="title error_title">Страница не найдена</h1>
                </div>
            </div>
        </div>
     );
}
 
export default PageNotExists;