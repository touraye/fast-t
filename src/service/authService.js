import axios from "axios";

const baseUrl = 'http://localhost:3001/auth'

const login = async ( userData ) => {  
  // const response = await axios.post( baseUrl, userData )

  if (userData) {
		window.localStorage.setItem('authUser', JSON.stringify(userData))
	}

  return userData
}

const logout = async () => {
  window.localStorage.removeItem('authUser')
}

const loginService = {
  login,
  logout,
}

export default loginService