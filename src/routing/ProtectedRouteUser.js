import { Navigate } from 'react-router-dom';

const ProtectedRouteUser = ({ children }) => {
    return (
        localStorage.getItem('userToken') ? (
            children
        ) : (
            <Navigate replace to='/login' />
        )
    );
};

export default ProtectedRouteUser;
