import React, { useEffect } from 'react'
import {  FaBook, FaMoneyBillAlt, FaMoneyCheck, FaMoneyCheckAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAccounts } from '../features/account/accountSlice'
import { setAuth } from '../features/auth/authSlice'

const Banking = () => {
	const { auth, isLoading, isError } = useSelector((state) => state.auth)		
	const dispatch = useDispatch()	
  
    useEffect(() => {
			if (isError) {
				console.log('Fetching account failed. Please try again!')
			}

			dispatch(getAccounts())
			dispatch( setAuth() )
			if ( auth === null ) {
				window.location.reload()				
			}			
		}, [dispatch, isError, auth])
		
		

		if (isLoading) return <p>...laoding</p>

  return (
		<div className='banking-content'>			 			
			<p className='page-title'>Welcome to your online banking service</p>
			<div className='menu'>
				<Link to='/deposite' className='menu-link'>
					<div className='menu-icon'>
						<FaMoneyBillAlt />
					</div>
					Deposite
				</Link>
				<Link to='/withdrawal' className='menu-link'>
					<div className='menu-icon'>
						<FaMoneyCheckAlt />
					</div>
					Withdrawal
				</Link>
				<Link to='/transfer' className='menu-link'>
					<div className='menu-icon'>
						<FaMoneyCheckAlt />
					</div>
					Transfer
				</Link>
				<Link to='/transaction' className='menu-link'>
					<div className='menu-icon'>
						<FaMoneyCheck />
					</div>
					Transaction
				</Link>
				<Link to='/account' className='menu-link'>
					<div className='menu-icon'>
						<FaBook />
					</div>
					Account Info
				</Link>
			</div>
		</div>
	)
}

export default Banking
