import axios from 'axios'
import { Dispatch } from 'redux'
import {
	logpassType,
	UserAction,
	UserActionTypes,
	UserDataType,
	WalletElementType,
	WalletType,
	WashListType
} from '../../types/userTypes'
import { isExist } from '../../utils/helper'

export const checkUser = (logpass: Pick<logpassType, 'login' | 'password'>) => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			dispatch({ type: UserActionTypes.FETCH_CHECKUSER })
			const response = await axios.post(
				`http://localhost:1234/api/user/check`,
				{
					login: logpass.login,
					password: logpass.password
				}
			)
			const data = response.data
			if (!isExist(data.id)) {
				data.correct_username
					? dispatch({
							type: UserActionTypes.FETCH_CHECKUSER_ERROR,
							payload: 'Wrong password'
					  })
					: dispatch({
							type: UserActionTypes.FETCH_CHECKUSER_ERROR,
							payload: 'User not found'
					  })
			} else {
				const washlistAndWallet = await axios.post(
					`http://localhost:1234/api/washlist_and_wallet`,
					{
						washlist_id: data.washlist_id,
						wallet_id: data.wallet_id
					}
				)
				dispatch({
					type: UserActionTypes.FETCH_CHECKUSER_SUCCESS,
					payload: {
						...data,
						washlist: washlistAndWallet.data.washlist,
						wallet_keys: Object.keys(washlistAndWallet.data.wallet),
						wallet: washlistAndWallet.data.wallet
					}
				})
			}
		} catch (e) {
			dispatch({
				type: UserActionTypes.FETCH_CHECKUSER_ERROR,
				payload: 'Error'
			})
		}
	}
}
export const setErrorAtAuth = (error: string) => {
	return { type: UserActionTypes.FETCH_CHECKUSER_ERROR, payload: error }
}
export const ChangeWashlist = (
	coin: string,
	washlist: WashListType,
	washlist_id: number,
	type: string
) => {
	const getNewWashlist = (): WashListType => {
		switch (type) {
			case 'add':
				return [...washlist, coin]
			case 'delete':
				return washlist.filter((item) => item !== coin)
			default:
				return washlist
		}
	}
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			const newWashlist = getNewWashlist()
			const response = await axios.post(
				`http://localhost:1234/api/change_washlist`,
				{
					washlist_id: washlist_id,
					washlist: newWashlist
				}
			)
			if (response.data.update)
				dispatch({
					type: UserActionTypes.UPDATE_WASHLIST,
					payload: newWashlist
				})
		} catch (e) {}
	}
}
export const clearWashlist = (washlist_id: number) => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			const response = await axios.post(
				`http://localhost:1234/api/change_wallet`,
				{
					washlist_id: washlist_id,
					washlist: []
				}
			)
			if (response.data.update)
				dispatch({ type: UserActionTypes.UPDATE_WASHLIST, payload: [] })
		} catch (e) {}
	}
}

export const ChangeWallet = (
	coin: string,
	data: WalletElementType,
	wallet: WalletType,
	wallet_id: number,
	type: string
) => {
	const getNewWallet = (): WalletType => {
		const tempWallet = { ...wallet }
		switch (type) {
			case 'add':
				tempWallet[coin] = data
				return tempWallet
			case 'delete':
				delete tempWallet[coin]
				return tempWallet
			default:
				return wallet
		}
	}
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			const newWallet = getNewWallet()
			const response = await axios.post(
				`http://localhost:1234/api/change_wallet`,
				{
					wallet_id: wallet_id,
					wallet: newWallet
				}
			)
			if (response.data.update)
				dispatch({
					type: UserActionTypes.UPDATE_WALLET,
					payload: newWallet
				})
		} catch (e) {
			console.log(e)
		}
	}
}
export const clearWallet = (wallet_id: number) => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			const response = await axios.post(
				`http://localhost:1234/api/change_wallet`,
				{
					wallet_id: wallet_id,
					wallet: {}
				}
			)
			if (response.data.update)
				dispatch({ type: UserActionTypes.UPDATE_WALLET, payload: {} })
		} catch (e) {}
	}
}

export const registerUser = (
	data: Omit<logpassType, 'confirmPassword'> &
		Pick<UserDataType, 'wallet' | 'washlist'>
) => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			dispatch({ type: UserActionTypes.FETCH_CHECKUSER })
			const res = await axios.post(
				`http://localhost:1234/api/user/check`,
				{
					login: data.login,
					password: data.password
				}
			)
			if (res.data.correct_username)
				dispatch({
					type: UserActionTypes.FETCH_CHECKUSER_ERROR,
					payload: 'Login already registered'
				})
			else {
				const res = await axios.post(
					`http://localhost:1234/api/user/create`,
					data
				)
				if (!res.data.error) {
					dispatch({
						type: UserActionTypes.FETCH_CHECKUSER_SUCCESS,
						payload: {
							...res.data,
							washlist: data.washlist,
							wallet_keys: Object.keys(data.wallet),
							wallet: data.wallet
						}
					})
					const wallet = await axios.post(
						`http://localhost:1234/api/change_wallet`,
						{
							wallet_id: res.data.wallet_id,
							wallet: data.wallet
						}
					)
					if (wallet.data.update)
						dispatch({
							type: UserActionTypes.UPDATE_WALLET,
							payload: data.wallet
						})
					const washlist = await axios.post(
						`http://localhost:1234/api/change_washlist`,
						{
							washlist_id: res.data.washlist_id,
							washlist: data.washlist
						}
					)
					if (washlist.data.update)
						dispatch({
							type: UserActionTypes.UPDATE_WASHLIST,
							payload: data.washlist
						})
				}
			}
		} catch (e) {}
	}
}
export const logoutUser = () => {
	return async (dispatch: Dispatch<UserAction>) => {
		try {
			dispatch({ type: UserActionTypes.LOGOUT_USER })
		} catch (e) {}
	}
}
