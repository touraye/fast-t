import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import accountService from '../../service/accountService'

const initialState = {
	accounts: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
}

export const getAccounts = createAsyncThunk(
	'account/get',
	async (_, thunkAPI) => {
		try {
			return await accountService.getAccount()
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

export const createAccount = createAsyncThunk(
	'account/create',
	async (accountData, thunkAPI) => {
		try {
			return await accountService.getAccount(accountData)
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

//deposite
export const depositeAccount = createAsyncThunk(
	'account/deposite',
	async (depositeData, thunkAPI) => {		
		try {
			const updatedAccount = {
				accountName: depositeData.accountName,
				accountNumber: depositeData.accountNumber,
				accountType: depositeData.accountType,
				balance: (depositeData.balance += depositeData.amount),
				interest: depositeData.interest,
				id: depositeData.id,
			}
			return await accountService.updateAccount(
				updatedAccount.id,
				updatedAccount
			)
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

//deposite
export const withdrawAccount = createAsyncThunk(
	'account/withdraw',
  async ( withdrawalData, thunkAPI ) => {    
    try {
      const updatedAccount = {
				accountName: withdrawalData.accountName,
				accountNumber: withdrawalData.accountNumber,
				accountType: withdrawalData.accountType,
				balance: withdrawalData.balance - withdrawalData.amount,
				interest: withdrawalData.interest,
				id: withdrawalData.id,
			}
			return await accountService.updateAccount(
				updatedAccount.id,
				updatedAccount
			)
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

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		setAccount(state, action) {
			return state.accounts
    },
    modifyAccount( state, action ) {
      const id = action.payload.id
      const accountToUpdate = state.accounts.map( acc => acc.id === id )      
      return state.accounts.map(acc => acc.id !== id ? acc : accountToUpdate)
    }
	},
	extraReducers: (bulder) => {
		bulder
			.addCase(getAccounts.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getAccounts.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.accounts = action.payload
			})
			.addCase(getAccounts.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(createAccount.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createAccount.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.accounts.push(action.payload)
			})
			.addCase(createAccount.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(depositeAccount.pending, (state) => {
				state.isLoading = true
			})
			.addCase(depositeAccount.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.accounts.push(action.payload)
			})
			.addCase(depositeAccount.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(withdrawAccount.pending, (state) => {
				state.isLoading = true
			})
			.addCase(withdrawAccount.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.accounts.push(action.payload)
			})
			.addCase(withdrawAccount.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	},
})

export const { setAccount } = accountSlice.actions

export default accountSlice.reducer
