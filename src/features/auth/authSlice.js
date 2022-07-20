import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../../service/authService'

const loggedUser = JSON.parse(window.localStorage.getItem('authUser'))

const initialState = {
	auth: loggedUser ? loggedUser : null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: '',
}

export const login = createAsyncThunk( 'auth/login', async (authData, thunkAPI) => {
	try {
		return	await loginService.login(authData)
	} catch (error) {
		const message = ( error.response &&
									error.response.message &&
								error.response.data ) ||
								error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const logout = createAsyncThunk( 'auth/logout', async () => {
	await loginService.logout()
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset(state) {
			state.isLoading = false 
			state.isSuccess = false
			state.isError = false
			state.message = ''
		},
		setAuth( state, action ) {
			return action.payload
		},
		setLogin( state, action ) {
			state.loggedUser = action.payload
		},
		setLogout( state, action ) {
			state.loggedUser = action.payload
		}
	},
	extraReducers: (builder) => {
		builder 
			.addCase( login.pending, (state) => {
				state.isLoading = true
			} )
			.addCase( login.fulfilled, ( state, action ) => {
				state.isLoading = false
				state.isSuccess = true 
				state.loggedUser = action.payload
			} )
			.addCase( login.rejected, ( state, action ) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.loggedUser = null
		})
	}
} )


export const { reset, setAuth, setLogin, setLogout } = authSlice.actions

export const onLogin = (userCredentail) => {
	return dispatch => {
		dispatch(setLogin(userCredentail))
	}
}

export const onLogout = () => {
	return ( dispatch ) => {
		window.localStorage.removeItem('authUser')
		dispatch(setLogin(null))
	}
}

export default authSlice.reducer
