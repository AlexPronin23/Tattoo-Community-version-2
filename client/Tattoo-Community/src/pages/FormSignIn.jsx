import { Link } from 'react-router-dom';

import './style.scss'

const FormSignIn = () => {
    return ( 
         <div className="form">
            <div className="container">
                <h2 className="title form_title">Регистрация</h2>

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
                                     Введите корректный email — он станет вашим логином.
                                    </li>
                                    <li className="form_item">
                                        Он понадобится для подтверждения регистрации и входа в аккаунт.
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
                                        Минимум 8 символов: буквы, цифры или знаки  
                                    </li>
                                    <li className="form_item">
                                        Чем сложнее пароль — тем безопаснее ваш аккаунт
                                    </li>
                                </ul>

                            </div>

                            </div>

                        </div>

                        <div className="form_column">
                            
                            <label className="form_label" > Подтвердите Пароль: </label>

                            <input 
                            type="password" 
                            required  
                            placeholder='Введите пароль повторно' 
                            maxLength={16}
                            className='form_input'
                            />

                        </div>

                        <div className="form_column">
                            
                            <label className="form_label" > Тату мастер? </label>

                            <input 
                            type="checkbox" 
                            className='form_input form_input-checkbox'
                            />

                            <div className="form_help">
                                <span>
                                    ?
                                </span>

                                <div className="form_tooltip">

                                <ul className="form_items">
                                    <li className="form_item">
                                     Если поставили галочку,то получаете доступ к личному профилю
                                    </li>
                                </ul>

                            </div>

                            </div>

                        </div>


                         <button className="button btn-reg">Зарегистрироваться</button>
                         <Link to={'/login'} className='form_link'>Уже есть аккаунт?</Link>
                         <br />
                         <Link to={'/'} className='form_link'>Назад</Link>

                    </div>

                  
                </form>

            </div>
        </div>
     );
}
 
export default FormSignIn;