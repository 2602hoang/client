import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { URL } from '../url';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [error, setError] = useState(null);
    const [errorRegister, setErrorRegister] = useState(null);

    useEffect(() => {
		LoadUserVerified();
		addToken(localStorage.getItem('userToken'));
	}, []);
	
	const LoadUserVerified = async () => {
		if ( localStorage.getItem('userToken')) {
			setUserToken( localStorage.getItem('userToken'));
			addToken( localStorage.getItem('userToken'));
		}
		else setUserToken(null);
		
	}
    const Register = async ({ username, phone, password }) => {
        try{
            const response = await axios.post(`${URL}api/v1/auth/register`, {
                username,
                phone,
                password
            });
            if (response.data.error === 0) {
                const token = response.data.token;
                localStorage.setItem('userToken', token);
                setUserToken(token);
                addToken(token);
                return { success: true , message: 'Đăng Ký Thành công'};
            } else if (response.data.error === 2) {
                
              
                return { success: false, message: 'Số điện thoại đã được đăng ký' };
            } else {
                return { success: false, message: 'Đăng ký thất bại' };
            }
        } catch (error) {
            console.log('Register error: ',error);
            return { success: false, message: 'Đăng ký thất bại, vui lòng thử lại' };

        }
    };

    const Login = async ({ phone, password }) => {
        // console.log('Login: ', phone, password);
        try {
            const response = await axios.post(`${URL}api/v1/auth/login`, {
                phone: phone,
                password: password
            });
            if (response.data.mes === "Đăng nhập thành công") {
                setError('Đăng nhập thành công');
                alert('Chào mừng bạn đến với bếp, đăng nhập thành công 🤗🤗🤗');
                // setTimeout(() => {
                //     setError('');
                // }, 10000);
                const token = response.data.access_token;
                
                // console.log("2121",token);
                localStorage.setItem('userToken', token);
                setUserToken(token);
                addToken(token);
                window.location.reload(false);
            } 
        } catch (error) {
            console.log('Loging error: ',error);
			//  toast.error("Email hoặc mật khẩu khồng đúng, vui lòng thử lại!");
			alert('thông xin sai mất rồi ,đăng nhập thất bại😓😓😓')
            setError('Thông tin không chính xác');
			setTimeout(() =>{
						setError('');
					}, 10000)
        }
    };

   

    const Logout = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
        addToken(null);
    };

    const addToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    return (
        <AuthContext.Provider value={{ errorRegister,setErrorRegister,userToken, setUserToken, Login,Register,Logout, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
