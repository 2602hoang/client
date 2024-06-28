import React, { useContext, useState } from 'react'
import bg from '../assets/hinh.png'
import bg1 from '../assets/hinh1.png'
import { Form, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';
function Login() {
    const nav = useNavigate();
   
    const [err, setErr] = useState("");
    const { Login, Register, setError} = useContext(AuthContext);
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
                nav("/home");
            } else {
                // Login failed
                setErr("số ĐT hoặc mật khẩu không đúng, vui lòng thử lại!");
                setTimeout(() => setErr(''), 3000);
            }
        } catch (error) {
            console.log(error);
            setErr("số ĐT hoặc mật khẩu không đúng, vui lòng thử lại!");
            setTimeout(() => setErr(''), 3000);
        }
    };
    const HandleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const phone = form.phone.value;
        const password = form.password.value;
        try{
            const RegisterData = Register({ username, phone, password });
            if (RegisterData && RegisterData.success) {
                setErr('Thành công ');
                setTimeout(() => setErr(''), 500);
                // nav("/home");
            } else {
                // Register failed
                setErr("Trùng số điện thoại");
                setTimeout(() => setErr(''), 3000);
            }
        } catch (error) {
            console.log(error);
            setErr("Đăng ký thất bại");
            setTimeout(() => setErr(''), 3000);
        }
    
    }




    return (
        <div
        style={{backgroundImage:window.innerWidth >= 768 ? `url(${bg})`:`url(${bg1})`,backgroundSize:window.innerWidth >= 768 ?'100% 100%':'100% 110%'}}
        className='overflow-hidden p-7 flex justify-center  items-center w-full h-screen'>

            {/* <div className='w-[300px] h-auto justify-center mt-48 bg-white items-center flex'> */}
                    <div class="wrapper">
                            <div class="card-switch">
                                <label class="switch ">
                                <input type="checkbox" class="toggle "/>
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
