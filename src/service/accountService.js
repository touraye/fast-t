import axios from 'axios'

const baseUrl = 'http://localhost:3001/accounts'

const getAccount = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createAccount = async (acoountData) => {
	const response = await axios.post(baseUrl, acoountData)
	return response.data
}

const updateAccount = async (id, acoountData) => {
  const response = await axios.put( `${baseUrl}/${id}`, acoountData )
  console.log('response.data', response.data)
	return response.data
}

const userService = {
	getAccount,
	createAccount,
	updateAccount,
}

export default userService
