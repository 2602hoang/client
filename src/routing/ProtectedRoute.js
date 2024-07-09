import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    return (
        localStorage.getItem('userToken') ? (
            children
        ) : (
            <Navigate replace to='/loginAdmin' />
        )
    );
};

export default ProtectedRoute;
