import { useEffect } from 'react'
import {FaUser} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAccounts } from '../features/account/accountSlice'

const Account = () => {
	const { accounts, isLoading, isError } = useSelector( ( state ) => state.account )		
	const {auth}=useSelector((state)=>state.auth)
 	const dispatch = useDispatch()

 	useEffect(() => {
			if (isError) {
				console.log('Fetching account failed. Please try again!')
			}
			dispatch(getAccounts())
 	}, [dispatch, isError])

	const foundAccount = accounts.find( acc => acc.accountName === auth?.user )	
 	if (isLoading) return <p>...laoding</p>

 return (
		<div>
			<div className='heading'>
				<Link to='/home' className='back-btn'>
					&#8592;
				</Link>
			</div>

			<h3 className='page-title'>Account Information</h3>		
			<div className='form card'>
				<h4><FaUser /> Account Info!</h4>
				<p>
					<strong>Account Name:</strong> {foundAccount?.accountName}
				</p>
				<p>
					<strong>Account Number:</strong> {foundAccount?.accountNumber}
				</p>
				<p>
					<strong>Current Balance:</strong> GMD {foundAccount?.balance.toFixed(2)}
				</p>
				<p>
					<strong>Interest:</strong> GMD {foundAccount?.interest}
				</p>
			</div>	
		</div>
 )
}

export default Account
