import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAccounts } from '../features/account/accountSlice'
import { getTransactions } from '../features/transaction/transactionSlice'

const Transaction = () => {	
	const { auth } = useSelector( ( state ) => state.auth )	
	const { transactions, isError, isLoading } = useSelector(
		(state) => state.transaction
	)
	
  const dispatch = useDispatch() 
  

  useEffect( () => {
    if ( isError ) {
      console.log('Fetching account failed. Please try again!');
		}
		dispatch( getTransactions())
    dispatch(getAccounts())
  }, [dispatch, isError])

	if ( isLoading ) return <p>...laoding</p>
	
	const foundAccount = transactions?.filter(
		(trans) => trans.accountName === auth?.user
	)	 	

  return (
		<div>
			<div className='heading'>
				<Link to='/home' className='back-btn'>
					&#8592;
				</Link>
			</div>
			<h3 className='page-title'>Transaction History</h3>
			<ul className='form card'>
				{foundAccount ? (
					foundAccount.map((trans) => (
						<li key={trans.id} className='transaction'>
							<p>
								<strong>Transaction Amount</strong> GMD{trans.amount.toFixed(2)}
							</p>
							<div>
								<strong>Then Balance</strong> GMD{trans.balance.toFixed(2)}
								<p>
									<strong>Transaction Type</strong> {trans.type}
								</p>
								<p>
									<strong>Transaction Time</strong>
									{new Date(trans.time).toLocaleString('en-US')}
								</p>
							</div>
						</li>
					))
					) : (
						<li>Oops! no account found</li>
						)}
			</ul>
		</div>
	)
}

export default Transaction