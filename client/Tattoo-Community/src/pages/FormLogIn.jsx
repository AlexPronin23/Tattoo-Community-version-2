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