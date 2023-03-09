import React from 'react'
import Header from './components/Header'
import CoinCard from './pages/CoinCard'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MiniCoinCards from './pages/MiniCoinCards'
import Washlist from './pages/Washlist'
import Wallet from './pages/Wallet'
import { hideContexWalletMenu } from './store/action-creators/walletMenu'
import { useActions } from './hooks/useActions'

const getRouter = (
	hideContexWalletMenu: Function,
	hideDropdownWalletMenu: Function
) => {
	return createBrowserRouter([
		{
			path: '/',
			element: (
				<>
					<Header />
					<MiniCoinCards />
				</>
			)
		},
		{
			path: '/coins/',
			element: (
				<>
					<Header active="coins" />
					<MiniCoinCards />
				</>
			)
		},
		{
			path: '/coins/:coin',
			element: (
				<>
					<Header />
					<CoinCard />
				</>
			)
		},
		{
			path: '/news',
			element: (
				<>
					<Header active="news" />
				</>
			)
		},
		{
			path: '/washlist',
			element: (
				<>
					<Header active="washlist" />
					<Washlist />
				</>
			)
		},
		{
			path: '/wallet',
			element: (
				<div
					onClick={() => {
						hideContexWalletMenu()
						hideDropdownWalletMenu()
					}}
				>
					<Header active="wallet" />
					<Wallet />
				</div>
			)
		}
	])
}
const App = () => {
	const { hideContexWalletMenu, hideDropdownWalletMenu } = useActions()
	return (
		<div>
			<RouterProvider
				router={getRouter(hideContexWalletMenu, hideDropdownWalletMenu)}
			/>
		</div>
	)
}

export default App
