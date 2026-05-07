import { Link } from 'react-router-dom';

import './style.scss'

const FormLogIn = () => {
    return ( 
        <div className="form">
            <div className="container">
                <h2 className="title form_title">Войти</h2>

                <form>

                    <div className="form_inner">

                        <div className="form_column">

                            <label className="form_label">Email: </label>

                            <input 
                            type="email" 
                            required 
                            placeholder='Введите email' 
                            maxLength={254} 
                            className='form_input'/>

                               <div className="form_help">
                                <span>
                                    ?
                                </span>

                                <div className="form_tooltip">

                                <ul className="form_items">
                                    <li className="form_item">
                                     Email должен совпадать с адресом, указанным при регистрации
                                    </li>
                                    <li className="form_item">
                                        Убедитесь, что вводите email без опечаток и лишних пробелов
                                    </li>
                                </ul>

                            </div>

                            </div>

                        </div>
                       
                        <div className="form_column">
                            
                            <label className="form_label" >Пароль: </label>

                            <input 
                            type="password" 
                            required  
                            placeholder='Введите пароль' 
                            maxLength={16}
                            className='form_input'
                            />

                            <div className="form_help">
                                <span>
                                    ?
                                </span>

                                <div className="form_tooltip">

                                <ul className="form_items">
                                    <li className="form_item">
                                        Убедитесь, что вводите правильный пароль 
                                    </li>
                                    <li className="form_item">
                                        При ошибке входа проверьте Caps Lock и раскладку
                                    </li>
                                </ul>

                            </div>

                            </div>

                        </div>


                         <button className="button btn-login">Войти</button>
                         <Link to={'/register'} className='form_link'>Еще нет аккаунта?</Link>

                    </div>

                  
                </form>

            </div>
        </div>
     );
}
 
export default FormLogIn;