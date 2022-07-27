import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAccounts, depositeAccount } from '../features/account/accountSlice'
import { setNotifications } from '../features/notification/notificationSlice'
import {createTransaction, getTransactions} from '../features/transaction/transactionSlice'

const Deposite = () => {
	const { accounts } = useSelector( state => state.account )
	const { auth } = useSelector( ( state ) => state.auth )	
	const dispatch = useDispatch()
   
  const [ amount, setAmount ] = useState( '' )
  
  const [ showNotification, setShowNotification ] = useState( false )
  

  useEffect( () => {
		dispatch( getAccounts() )
		dispatch( getTransactions())
  }, [ dispatch ] )   

	const foundAccount = accounts?.find( acc => acc.accountName === auth?.user )	


  const onSubmit = ( e ) => {
    e.preventDefault()
		
		if ( amount < 300 ) {
			return alert(`Deposite unsuccessful! deposite should be atleast GMD300 or more`)
		}
		
		const depositeData = {
			...foundAccount,
			amount: Number(amount),					
		}
		setShowNotification( !showNotification )

		const transactionData = {
			...depositeData,
			type: 'deposite'
		}

    dispatch(depositeAccount(depositeData))
		dispatch( setNotifications( depositeData, 1000 ) )
		dispatch( createTransaction( transactionData ) )
		alert(`Deposite Successful! Amount deposited: GMD${depositeData.amount}`)
		setAmount('')
  }
	
  return (
		<div>
      {/* { showNotification && <Notification
        message={notification}
				showNotification={showNotification}
				setShowNotification={setShowNotification}
			/>} */}
			<div className='heading'>
				<Link to='/' className='back-btn'>
					&#8592;
				</Link>
			</div>
			<p className='page-title'>Make some deposite now?</p>
			<form onSubmit={onSubmit} className='form deposite-form card'>	
				<div className='form-group'>
					<label htmlFor='amount'>Amount</label>
					<input
						type='number'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder='Enter amount'
						required
					/>
				</div>
				<div className='form-group'>
					<input type='submit' className='btn submit-btn' value='Deposite' />
				</div>
			</form>
		</div>
	)
}

export default Deposite
