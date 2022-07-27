import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAccounts, withdrawAccount } from '../features/account/accountSlice'
import { createTransaction } from '../features/transaction/transactionSlice'

const Withdrawal = () => {
	const { accounts } = useSelector( ( state ) => state.account )	
	const { auth } = useSelector( ( state ) => state.auth )	
  const dispatch = useDispatch()

  const [ amount, setAmount ] = useState( '' )
  
   useEffect(() => {
			dispatch(getAccounts())
	 }, [ dispatch ] )
	
	const foundAccount = accounts?.find((acc) => acc.accountName === auth?.user)

	const onSubmit = (e) => {
		e.preventDefault()

    if (amount <= 0) {
      return alert('Amount cannot be zero or lessthan zero')
		}
		
		if ( foundAccount?.balance - amount <= 300 ) {
			return alert(
				`Withdrawal unsuccessful! Your current balance is GMD${
					foundAccount?.balance
				}, and you are withdrawing GMD${amount} your balance will be GMD${
					foundAccount?.balance - amount
				} which is either lessthan or equals to the minimum balance GMD300. Try amount below your current withdraw GMD${amount}`
			)
		}

    const withdrawalData = {
      ...foundAccount,
      amount: Number(amount),
		}
		
		const transactionData = {
			...withdrawalData,
			type: 'withdarwal'
		}

    dispatch(withdrawAccount(withdrawalData))
		// console.log( 'depositeData', withdrawalData, 'acc', foundAccount )
		dispatch( createTransaction( transactionData ) )
		alert( `withdrawal Successful! Amount withdrawn: GMD${withdrawalData.amount}` )
		setAmount('')
	}
	return (
		<div>
			<div className='heading'>
				<Link to='/' className='back-btn'>
					&#8592;
				</Link>
			</div>
			<p className='page-title'>Make some withdrawal now?</p>
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
					<input type='submit' className='btn submit-btn' value='Withdraw' />
				</div>
			</form>
		</div>
	)
}

export default Withdrawal
