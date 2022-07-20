import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transactionService from '../../service/transactionService'

const initialState = {
	transactions: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: '',
}

export const getTransactions = createAsyncThunk(
	'transaction/get',
	async (_, thunkAPI) => {
		try {
			return await transactionService.getTransactions()
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

export const createTransaction = createAsyncThunk(
	'transaction/create',
	async (transactionData, thunkAPI) => {
    try {
      const getId = () => (100000 * Math.random()).toFixed(0)
      const formatted = {
        ...transactionData,
        id: getId(),
        time: new Date(),
      }
			return await transactionService.createTransaction(formatted)
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

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		reset(state, ) {
      state.isLoading = false
      state.isSuccess = false 
      state.isError = false 
      state.message = ''
		},		
	},
	extraReducers: (bulder) => {
		bulder
			.addCase(getTransactions.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTransactions.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.transactions = action.payload
			})
			.addCase(getTransactions.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(createTransaction.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createTransaction.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.transactions.push(action.payload)
			})
			.addCase(createTransaction.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})		
	},
})

export const { reset } = transactionSlice.actions

export default transactionSlice.reducer
