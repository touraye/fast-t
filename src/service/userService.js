import axios from "axios";

const baseUrl = 'http://localhost:3001/users'

const getUsers = async () => {
  const response = await axios.get( baseUrl )
  return response.data
}

const userService = {
  getUsers
}

export default userService