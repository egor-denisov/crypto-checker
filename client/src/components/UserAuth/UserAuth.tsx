import { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { logpassType } from '../../types/userTypes'
import { validateEmail } from '../../utils/helper'
import Registration from './Registration'
import Account from './Account'
import Authorization from './Authorization'

type props = {
	visible: boolean
	setVisible: Function
}
const UserAuth: FC<props> = ({ visible, setVisible }) => {
	const [hidePassword, setHidePassword] = useState(true)
	const [condition, setCondition] = useState('registration')
	const [logpass, setLogpass] = useState({
		login: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	const { error, data } = useTypedSelector((state) => state.user)
	const { checkUser, registerUser, logoutUser, setErrorAtAuth } = useActions()

	const goLogin = (data: logpassType) => {
		if (data.password === '') setErrorAtAuth('Password field is empty')
		else checkUser({ login: data.login, password: data.password })
	}
	const goRegister = (logpass: logpassType) => {
		if (logpass.login === '') setErrorAtAuth('Wrong login')
		else if (!validateEmail(logpass.email)) setErrorAtAuth('Wrong E-mail')
		else if (logpass.password === '')
			setErrorAtAuth('Password field is empty')
		else if (logpass.password !== logpass.confirmPassword)
			setErrorAtAuth('Password mismatch')
		else {
			registerUser({
				login: logpass.login,
				password: logpass.password,
				email: logpass.email,
				washlist: data.washlist,
				wallet: data.wallet
			})
		}
	}
	const goLogout = () => {
		logoutUser()
	}
	const onTyping = (
		e: React.FormEvent<HTMLInputElement>,
		field: keyof logpassType
	) => {
		setLogpass({ ...logpass, [field]: e.currentTarget.value })
	}
	const onEnter = (e: React.KeyboardEvent) => {
		if (e.keyCode === 13) {
			switch (condition) {
				case 'login':
					goLogin(logpass)
					return
				case 'registration':
					goRegister(logpass)
					return
				default:
					return
			}
		}
	}
	const clearField = (field: keyof logpassType) =>
		setLogpass({ ...logpass, [field]: '' })
	const goRegistrationPage = () => setCondition('registration')
	useEffect(() => {
		if (error === '' && data.id !== -1) {
			setCondition('account')
		} else if (data.id === -1) {
			setCondition('login')
		}
	}, [error, data.id])
	if (!visible) return <></>
	switch (condition) {
		case 'registration':
			return (
				<Registration
					setVisible={setVisible}
					setCondition={setCondition}
					onTyping={onTyping}
					onEnter={onEnter}
					clearField={clearField}
					setHidePassword={setHidePassword}
					goRegister={goRegister}
					logpass={logpass}
					hidePassword={hidePassword}
				/>
			)
		case 'account':
			return <Account setVisible={setVisible} goLogout={goLogout} />
		default:
			return (
				<Authorization
					setVisible={setVisible}
					onTyping={onTyping}
					onEnter={onEnter}
					clearField={clearField}
					setHidePassword={setHidePassword}
					goRegistrationPage={goRegistrationPage}
					goLogin={goLogin}
					logpass={logpass}
					hidePassword={hidePassword}
				/>
			)
	}
}

export default UserAuth
