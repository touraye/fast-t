import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import accountReducer from '../features/account/accountSlice'
import notificationReducer from '../features/notification/notificationSlice'
import transactionReducer from '../features/transaction/transactionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    account: accountReducer,
    transaction: transactionReducer,
    notification: notificationReducer,
  },
});
