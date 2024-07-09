import { Navigate } from 'react-router-dom';

const ProtectedRouteUserNoLogin = ({ children }) => {
    return (
        !localStorage.getItem('userToken') ? (
            children
        ) : (
            <Navigate replace to='/home' />
        )
    );
};

export default ProtectedRouteUserNoLogin;
