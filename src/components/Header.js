import { useEffect } from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/user/userSlice'
import {setAuth , onLogout } from '../features/auth/authSlice'

const Header = () => {
 const { auth, isLoading, isError, message } = useSelector(
		(state) => state.auth
 )
	const dispatch = useDispatch()
  const navigate = useNavigate()  
  
  useEffect(() => {   
    if (isError) {
      console.log(message)
    }   
   
    dispatch( getUsers() )  
    dispatch( setAuth() )
    // if ( auth === null ) {
    //   navigate('/login')
    // }
  }, [ dispatch, navigate, isError, message, auth ] )
  
  const logout = () => {    
    dispatch(onLogout())          
    navigate('/')
  }

  if ( isLoading ) {
    return <p>...Loading</p>
  }

	return (
		<header className='header'>
			<h1 className='logo'>Online Bnak</h1>
			<div className='login-container'>
				<a href='/' onClick={logout} className='btn btn-block login-btn'>
					<FaUser /> {auth ? <FaSignOutAlt /> : <FaSignInAlt />}
				</a>
				{/* <button onClick={logout} className='btn btn-block login-btn'>
					<FaUser /> {auth ? <FaSignOutAlt /> : <FaSignInAlt />}
				</button> */}
				<p className='auth-user'>{auth ? auth.username : ''}</p>
			</div>
		</header>
	)
}

export default Header
