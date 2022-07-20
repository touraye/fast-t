import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../service/userService'

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export const getUsers = createAsyncThunk(
	'user/getUsers',
	async (_, thunkAPI) => {
		try {
			return await userService.getUsers()		
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const userSlice = createSlice( {
  name: 'user',
  initialState,
  reducers: {
    setUser( state, action ) {
      return state.users
    },
  },
  extraReducers: ( bulder )=>{
    bulder
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.users = action.payload
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
  }
} )

export const { setUser } = userSlice.actions 

export default userSlice.reducer