import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/user/userSlice'
import { login, reset, setLogin } from '../features/auth/authSlice'

const Login = () => {
	const { users, isLoading, isSuccess, isError, message } = useSelector( state => state.user )
	const { auth } = useSelector( state => state.auth )
	const dispatch = useDispatch()
	const navigate = useNavigate()
  const[username,setUsername]=useState('')
	const [ password, setPassword ] = useState( '' )
	
	useEffect( () => {
		if ( auth === null ) {
			navigate('/login')
		}
		if ( isError ) {
			console.log(message);
		}		
		dispatch( getUsers() )
		dispatch(reset())
	}, [dispatch, auth, navigate, isError, message])
  
  const onSubmit = ( e ) => {
    e.preventDefault()
   			
		const foundUser = users?.find( user => user.username === username )		

		 const userCredentail = {
				username,
			 password,
				user: foundUser.name
			}
		
		if ( foundUser?.password !== password ) {
			return alert('Wrong credentails!')
		}

		window.localStorage.setItem('authUser', JSON.stringify(userCredentail)) 
		dispatch( setLogin( userCredentail ) )		
		navigate( '/' )
		
		setUsername( '' )
		setPassword( '' )
	}
	
	if(isLoading) return <p>...Loading</p>

  return (
		<form onSubmit={onSubmit} className='form login-form card'>
			<div className='form-group'>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder='Enter password'
					required
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Enter password'
					required
				/>
			</div>
			<div className='form-group'>
				<input type='submit' value='Login' className='btn login-btn' />
			</div>
		</form>
	)
}

export default Login
