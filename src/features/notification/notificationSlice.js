import { createSlice } from '@reduxjs/toolkit'


const initialState = {
	notification: null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotifications(state, action) {			
			return action.payload
		},
	},
})

export const { setNotifications } = notificationSlice.actions

let timeOutId = null

export const createNotification = (newNotification, time) => {	
	return (dispatch) => {
		dispatch(setNotifications(newNotification))

		if (timeOutId) {
			clearTimeout(timeOutId)
		}

		timeOutId = setTimeout(() => {
			dispatch(setNotifications(null))
		}, time * 1000)
	}
}

export default notificationSlice.reducer
