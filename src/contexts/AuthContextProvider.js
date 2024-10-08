import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { URL } from '../url';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [userToken, setUserToken] = useState(null);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [errorRegister, setErrorRegister] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({});

    const getoneUser = async () => {
      try {
        const id_user = userId;
        const response = await axios.get(`${URL}api/v1/user/getone/${id_user}`,
        { headers: { "Authorization": `Bearer ${userToken}` } },
        );
        setUser(response.data.user);
      } catch (error) {
        if( error.response.status === 401) {
            Logout();
        }else{
        console.error('Error fetching user data:', error);
        setUser({});
        }
        }
      
    };
    

    useEffect(() => {
      if (userId && userToken) {
        getoneUser();
      }
    }, [userId, userToken]);

    useEffect(() => {
        if (userId) {
            const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
            if (storedCart.length > 0) {
                setCart(storedCart);
            }
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        }
    }, [cart, userId]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const updateCartQuantity = (productId, qty) => {
        setCart((storedCart) => {
            return storedCart.map((item) => 
                item.id_product === productId ? { ...item, qty: Math.min(qty, item.stock) } : item
            );
        });
    };
    // console.log(userToken)
    const removeFromCart = (item) => {
        const newCart = [...cart];
        const index = newCart.findIndex((cartItem) => cartItem.name === item.name);
        if (index !== -1) {
            if (newCart[index].quantity > 1) {
                newCart[index].quantity -= 1;
            } else {
                newCart.splice(index, 1);
            }
            setCart(newCart);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        LoadUserVerified();
        addToken(localStorage.getItem('userToken'));
    }, []);
    
    const LoadUserVerified = async () => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token);
            addToken(token);
            setUserId(localStorage.getItem('userId'));
        } else {
            setUserToken(null);
            setUserId(null);
        }
    };

    const Register = async ({ username, phone, password }) => {
        try {
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
                return { success: true, message: 'Đăng Ký Thành công' };
            } else if (response.data.error === 2) {
                return { success: false, message: 'Số điện thoại đã được đăng ký' };
            } else {
                return { success: false, message: 'Đăng ký thất bại' };
            }
        } catch (error) {
            console.log('Register error: ', error);
            return { success: false, message: 'Đăng ký thất bại, vui lòng thử lại' };
        }
    };

    const Login = async ({ phone, password }) => {
        try {
            const response = await axios.post(`${URL}api/v1/auth/login`, {
                phone: phone,
                password: password
            });
            if (response.data.status === 1) {
                return { success: false, message: 'Tài khoản đã bị khóa' };
            } else if (response.data.mes === "Đăng nhập thành công") {
                setError('Đăng nhập thành công');
                alert(`Chào mừng bạn đến với bếp, đăng nhập thành công 🤗🤗🤗 ${response.data.id_role === 123 ? "Quản trị" : response.data.id_role === 124 ? "Nhân viên" : "Khách Hàng"}`);
                const token = response.data.access_token;
                const userId = response.data.id_user;
                localStorage.setItem('userToken', token);
                setUserToken(token);
                addToken(token);
                localStorage.setItem('userId', userId);
                setUserRole(response.data.id_role);
                setUserId(userId);
                window.location.reload(false);
            }
            if (response.data.error === 1 || response.data.error === 2) {
                return { success: false, message: 'thông tin không hợp lệ' };
            }
        } catch (error) {
            console.log('Loging error: ', error);
            alert('thông xin sai mất rồi ,đăng nhập thất bại😓😓😓');
            setError('Thông tin không chính xác');
            setTimeout(() => {
                setError('');
            }, 10000);
        }
    };

    const Logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        setUserToken(null);
        setUserRole(null);
        setUserId(null);
        addToken(null);
        // clearCart(); // Clear cart when user logs out
    };

    const addToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    return (
        <AuthContext.Provider value={{
            cart,
            addToCart,
            user,
            getoneUser,
            removeFromCart,
            updateCartQuantity,
            clearCart,
            errorRegister, setErrorRegister, userToken,
            setUserToken, Login, Register, Logout, error,
            setError, userRole, userId, setUserId,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
