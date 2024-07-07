import React, { useContext, useRef, useState } from 'react'
import bg from '../assets/hinh.png'
import bg1 from '../assets/hinh1.png'
import { Form, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';
import { notification } from 'antd';
function Login() {
    // const nav = useNavigate();
    const toggleRef = useRef(null);
    const [err, setErr] = useState("");
    const { Login, Register, setError ,setErrorRegister} = useContext(AuthContext);
    const HandleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const phone = form.phone.value;
        const password = form.password.value;

        try {
            const LoginData = await Login({ phone, password });
            if (LoginData && LoginData.success) {
               
                
                setError('Thành Công');
                setTimeout(() => setErr(''), 500);
                notification.success({
                    message: 'Thành công',
                    description: `Đăng nhập thành công! phone ${phone}`,
                });
                
            } 
        } catch (error) {
            console.log(error);
            setErr("số ĐT hoặc mật khẩu không đúng, vui lòng thử lại!");
            
            setTimeout(() => setErr(''), 3000);
            notification.error({
                message: 'Thất Bại',
                description: `số ĐT hoặc mật khẩu không đúng, vui lòng thử lại!`,
            });
        }
    };
    const HandleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const phone = form.phone.value;
        const password = form.password.value;
    
        try {
            const RegisterData = await Register({ username, phone, password });
            if (RegisterData.success) {
                setErr(RegisterData.message);
                setTimeout(() => setErr(''), 3000);
                notification.success({
                    message: 'Thành công',
                    description: `Cập nhật sản phẩm thành công! phone ${phone}`,
                });
                form.reset();
                if (toggleRef.current) {
                    toggleRef.current.checked = false;
                }
                
                
            } else {
                setErr(RegisterData.message);
                setTimeout(() => setErr(''), 3000);
            }
        } catch (error) {
            console.log(error);
            setErr("Đăng ký thất bại, vui lòng thử lại");
            setTimeout(() => setErr(''), 3000);
        }
    };




    return (
        <div
        style={{backgroundImage:window.innerWidth >= 768 ? `url(${bg})`:`url(${bg1})`,backgroundSize:window.innerWidth >= 768 ?'100% 100%':'100% 110%'}}
        className='overflow-hidden p-7 flex justify-center  items-center w-full h-screen'>

            {/* <div className='w-[300px] h-auto justify-center mt-48 bg-white items-center flex'> */}
                    <div class="wrapper">
                            <div class="card-switch">
                                <label class="switch ">
                                <input type="checkbox" class="toggle " ref={toggleRef} />
                                <span class="slider "></span>
                                <span class="card-side"></span>
                                <div class="flip-card__inner">
                                    <div class="flip-card__front">
                                        <div class="title">Log in</div>
                                        <form  class="flip-card__form" onSubmit={HandleLogin}>
                                            <input class="flip-card__input" name="phone" placeholder="phone" type="Phone"/>
                                            <input class="flip-card__input" name="password" placeholder="Password" type="password"/>
                                            <span>{err}</span>
                                            <button class="flip-card__btn" >Let`s go!</button>
                                        </form>
                                    </div>
                                    <div class="flip-card__back">
                                        <div class="title">Sign up</div>
                                        <form class="flip-card__form" action="" onSubmit={HandleRegister}>
                                            <input class="flip-card__input" name="username" placeholder="username" type="username"/>
                                            <input class="flip-card__input" name="phone" placeholder="phone" type="phone"/>
                                            <input class="flip-card__input" name="password" placeholder="Password" type="password"/>
                                            <span>{err}</span>
                                            <button class="flip-card__btn">Confirm!</button>
                                        </form>
                                    </div>
                                </div>
                                </label>
                            </div>   
                    </div>
            {/* </div> */}

        </div>
    )
}

export default Login
