import { Navigate } from 'react-router-dom'

const ProtectedRouteNoLogin = ({ children}) => {
	return (
				!localStorage.getItem('userToken') ? (
					children
				) : (
					<Navigate replace to='/home' />
				)
	)
}

export default ProtectedRouteNoLogin