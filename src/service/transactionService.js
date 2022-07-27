import axios from 'axios'

const baseUrl = 'http://localhost:3001/transactions'

const getTransactions = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createTransaction = async (transactionData) => {
  const response = await axios.post( baseUrl, transactionData )  
	return response.data
}

const updateTransaction = async (id, acoountData) => {
	const response = await axios.put(`${baseUrl}/${id}`, acoountData)	
	return response.data
}

const userService = {
	getTransactions,
	createTransaction,
	updateTransaction,
}

export default userService
