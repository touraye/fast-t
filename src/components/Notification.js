import { useSelector } from "react-redux"

const Notification = ( { message, showNotification, setShowNotification } ) => {
	const { notification } = useSelector( state => state )		
  return (
		<div className='notification-card'>
			<h4>Account Info!</h4>
			<p>
				<strong>Account Name:</strong> {notification?.accountName}
			</p>
			<p>
				<strong>Account Number:</strong> {notification?.accountNumber}
			</p>
			<p>
				<strong>Current Balance:</strong> GMD {notification?.currentBalance}
			</p>
			<p>
				<strong>Interest:</strong> GMD {notification?.currentInterest}
			</p>
			<div className='notification-btn-contianer'>
				<button
					onClick={() => setShowNotification(!showNotification)}
					className='btn close-btn'>
					OK
				</button>
			</div>
		</div>
	)
}

export default Notification