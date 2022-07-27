import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { depositeAccount, getAccounts, withdrawAccount } from '../features/account/accountSlice'
import { createTransaction } from '../features/transaction/transactionSlice'

const Transfer = () => {
	const { accounts } = useSelector( ( state ) => state.account )
	const { auth } = useSelector( ( state ) => state.auth )	
  const dispatch = useDispatch()
  	
	const [recipientAccountName, setRecipientAccountName] = useState('')
	const [recipientAccountNumber, setRecipientAccountNumber] = useState('')
	const [amount, setAmount] = useState('')

   useEffect(() => {
			dispatch(getAccounts())
		}, [dispatch])

	const senderAccount = accounts?.find( ( acc ) => acc.accountName === auth?.user )	
	
	const onSubmit = (e) => {
		e.preventDefault()
		
		const recipientAccount = accounts?.find(
			(acc) => acc.accountNumber === recipientAccountNumber
		)
		if (recipientAccount?.accountName !== recipientAccountName) {
			return alert('Invalid credentails')
		}

		if (amount <= 0) {
			return alert('Amount cannot be zero or lessthan zero')
		}

		if (senderAccount?.balance - amount <= 300) {
			return alert(
				`Your current balance GMD${senderAccount.balance}, you are sending GMD${amount}, and your balance will be GMD${senderAccount.balance - amount} which lessthan or equals to the minimum balance GMD300. Your left-over should be morethan GMD300.`
			)
		}

		const withdrawalFromSender = {
			...senderAccount,
			amount: Number(amount),
		}

		const depositeToRecipient = {
			...recipientAccount,
			amount: Number(amount),
		}
		const widthdrawTransaction = {
			...withdrawalFromSender,
			type: 'transfer',
		}
		const depositeTransaction = {
			...depositeToRecipient,
			type: 'transfer',
		}
		dispatch(withdrawAccount(withdrawalFromSender)) //?withdrawing money from sender's acc
		dispatch(depositeAccount(depositeToRecipient)) //*depositing into recipient acc
		dispatch(createTransaction(widthdrawTransaction))
		dispatch( createTransaction( depositeTransaction ) )
		alert(
			`Transfer Successful! Amount transfered: GMD${depositeToRecipient.amount}Transfered to: ${recipientAccountName}`
		)
		setRecipientAccountName( '' )
		setRecipientAccountNumber( '' )
		setAmount( '' )		
	}
	return (
		<div>
			<div className='heading'>
				<Link to='/' className='back-btn'>
					&#8592;
				</Link>
			</div>
			<p className='page-title'>Make some transfer to other account now?</p>
			<form onSubmit={onSubmit} className='form deposite-form card'>		
				<div className='form-group'>
					<label htmlFor='recipientAccountName'>Recipient Account Name</label>
					<input
						type='text'
						value={recipientAccountName}
						onChange={(e) => setRecipientAccountName(e.target.value)}
						placeholder='Enter account name'
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='recipientAccountNumber'>
						Recipient Account Number
					</label>
					<input
						type='text'
						value={recipientAccountNumber}
						onChange={(e) => setRecipientAccountNumber(e.target.value)}
						placeholder='Enter account number'
						required
					/>
				</div>
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
					<input type='submit' className='btn submit-btn' value='Tsanfer Money' />
				</div>
			</form>
		</div>
	)
}

export default Transfer
