import Banking from './components/Banking'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Header from './components/Header';
import Deposite from './components/Deposite';
import Withdrawal from './components/Withdrawal'
import Transfer from './components/Transfer'
import Transaction from './components/Transaction'
import Account from './components/Account'
import Footer from './components/Footer';
function App() {
  return (
		<div className='container'>
			<Router>
				<Header />
				<div className='main'>
					<Routes>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/' element={<Banking />}></Route>
						<Route path='/deposite' element={<Deposite />}></Route>
						<Route path='/withdrawal' element={<Withdrawal />}></Route>
						<Route path='/transfer' element={<Transfer />}></Route>
						<Route path='/transaction' element={<Transaction />}></Route>
						<Route path='/account' element={<Account />}></Route>
					</Routes>
				</div>
				<Footer />
			</Router>
		</div>
	)
}

export default App;
