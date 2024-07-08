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
    const validatePhone = (phone) => {
        const phoneRegex = /^0\d{9}$/;
        return phoneRegex.test(phone);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };
    const HandleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const phone = form.phone.value;
        const password = form.password.value;
        if (!validatePhone(phone)) {
            notification.warning({
                message: 'Lỗi SDT',
                description: `SĐT phải là 10 ký tự định dạng 0XXX-XXXXXXX`,
            });
            return;
        }

        if (!validatePassword(password)) {
            notification.warning({
                message: 'Lỗi mật khẩu',
                description: `Mật khẩu phải từ 6 ký tự`,
            });
            return;
        }

        try {
            const LoginData = await Login({ phone, password });
            if (LoginData && LoginData.success) {
                setError('Thành Công');
                setTimeout(() => setErr(''), 500);
                notification.success({
                    message: 'Thành công',
                    description: `Đăng nhập thành công! phone ${phone}`,
                });
            } else {
                setErr(LoginData.success === false || LoginData.message === "thông tin không hợp lệ");
                setTimeout(() => setErr(''), 3000);
                notification.error({
                    message: 'Thất Bại',
                    description: 'Số ĐT hoặc mật khẩu không đúng, vui lòng thử lại!',
                });
            }
        } catch (error) {
            console.log(error);
            // setErr("số ĐT hoặc mật khẩu không đúng, vui lòng thử lại!");
            
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
        if (!validatePhone(phone)) {
            notification.warning({
                message: 'Lỗi SDT',
                description: `SĐT phải là 10 ký tự định dạng 0XXX-XXXXXXX`,
            });
            return;
        }

        if (!validatePassword(password)) {
            notification.warning({
                message: 'Lỗi mật khẩu',
                description: `Mật khẩu phải từ 6 ký tự`,
            });
            return;
        }
    
        try {
            const RegisterData = await Register({ username, phone, password });
            if (RegisterData.success) {
                setErr(RegisterData.message);
                setTimeout(() => setErr(''), 3000);
                notification.success({
                    message: 'Thành công',
                    description: `Đăng ký thành công! phone ${phone}`,
                });
                form.reset();
                if (toggleRef.current) {
                    toggleRef.current.checked = false;
                }
                
                
            } else {
                setErr(RegisterData.message);
                setTimeout(() => setErr(''), 3000);
                notification.error({
                    message: 'Thất bại',
                    description: `Số điện thoại ${phone} đã được đăng ký `,
                });
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
                                        <div class="title">Đăng Nhập</div>
                                        <form  class="flip-card__form" onSubmit={HandleLogin}>
                                            <input class="flip-card__input" name="phone" placeholder="SĐT" type="Phone"/>
                                            <input class="flip-card__input" name="password" placeholder="Mật khẩu" type="password"/>
                                            <span>{err}</span>
                                            <button class="flip-card__btn" >Đăng Nhập!</button>
                                        </form>
                                    </div>
                                    <div class="flip-card__back">
                                        <div class="title">Đăng Ký</div>
                                        <form class="flip-card__form" action="" onSubmit={HandleRegister}>
                                            <input class="flip-card__input" name="username" placeholder="Tên người dùng" type="username"/>
                                            <input class="flip-card__input" name="phone" placeholder="SĐT" type="phone"/>
                                            <input class="flip-card__input" name="password" placeholder="Mật khẩu" type="password"/>
                                            <span>{err}</span>
                                            <button class="flip-card__btn">Tiếp Tục!</button>
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
