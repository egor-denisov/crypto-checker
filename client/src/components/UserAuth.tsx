import React, { FC, useEffect, useState } from 'react'
import UserSVG from '../svg/User'
import MyInput from './UI/MyInput/MyInput'
import EyeSVG from '../svg/Eye'
import EyeOffSVG from '../svg/EyeOff'
import LogoVkSVG from '../svg/LogoVK'
import LogoGoogleSVG from '../svg/LogoGoogle'
import CrossInCircleSVG from '../svg/CrossInCircle'
import EditSVG from '../svg/Edit'
import MyButton from './UI/MyButton/MyButton'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import { logpassType } from '../types/userTypes'
import MyModal from './UI/MyModal/MyModal'
import { validateEmail } from '../utils/helper'

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
		else if (validateEmail(logpass.email) === null)
			setErrorAtAuth('Wrong E-mail')
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
			setVisible(false)
			setCondition('account')
		} else if (data.id === -1) {
			setVisible(false)
			setCondition('login')
		}
	}, [error, data.id])
	if (!visible) return <></>
	switch (condition) {
		case 'registration':
			return (
				<MyModal
					setVisible={setVisible}
					className="user-auth registration"
				>
					<div className="title">
						<UserSVG />
						Registration
					</div>
					<div className="info">
						Have an account?{' '}
						<a onClick={() => setCondition('signin')}>
							Sign in here
						</a>
					</div>
					<div className="companies">
						<div className="item google">
							<LogoGoogleSVG />
							<p>Continue with Google</p>
						</div>
						<div className="item vk">
							<LogoVkSVG />
							<p>Continue with Vk</p>
						</div>
					</div>
					<div className="login">
						<p className="name">Create login:</p>
						<MyInput
							className="login-input"
							placeholder="Your login"
							value={logpass.login}
							positionPicture="right"
							onChange={(e: React.FormEvent<HTMLInputElement>) =>
								onTyping(e, 'login')
							}
							condition={
								[
									'Wrong login',
									'Login already registered'
								].includes(error)
									? 'error'
									: ''
							}
							onKeyDown={onEnter}
						>
							{logpass.login !== '' ? (
								<CrossInCircleSVG
									onClick={() => clearField('login')}
								/>
							) : (
								<></>
							)}
						</MyInput>
						<div className="error">
							{[
								'Wrong login',
								'Login already registered'
							].includes(error)
								? error
								: ''}
						</div>
					</div>
					<div className="email">
						<p className="name">E-mail:</p>
						<MyInput
							className="email-input"
							placeholder="Your e-mail"
							value={logpass.email}
							positionPicture="right"
							onChange={(e: React.FormEvent<HTMLInputElement>) =>
								onTyping(e, 'email')
							}
							condition={error === 'Wrong E-mail' ? 'error' : ''}
							type="email"
							onKeyDown={onEnter}
						>
							{logpass.email !== '' ? (
								<CrossInCircleSVG
									onClick={() => clearField('email')}
								/>
							) : (
								<></>
							)}
						</MyInput>
						<div className="error">
							{error === 'Wrong E-mail' ? error : ''}
						</div>
					</div>
					<div className="password">
						<p className="name">Password:</p>
						<MyInput
							className="password-input"
							placeholder="Your password"
							type={hidePassword ? 'password' : 'text'}
							positionPicture="right"
							value={logpass.password}
							condition={
								[
									'Password mismatch',
									'Password field is empty'
								].includes(error)
									? 'error'
									: ''
							}
							onChange={(e: React.FormEvent<HTMLInputElement>) =>
								onTyping(e, 'password')
							}
							onKeyDown={onEnter}
						>
							{hidePassword ? (
								<EyeSVG
									onClick={() => setHidePassword(false)}
								/>
							) : (
								<EyeOffSVG
									onClick={() => setHidePassword(true)}
								/>
							)}
						</MyInput>
						<div className="error">
							{error === 'Password field is empty' ? error : ''}
						</div>
					</div>
					<div className="password">
						<p className="name">Confirm password:</p>
						<MyInput
							className="password-input"
							placeholder="Repeat your password"
							type={hidePassword ? 'password' : 'text'}
							positionPicture="right"
							value={logpass.confirmPassword}
							condition={
								error === 'Password mismatch' ? 'error' : ''
							}
							onChange={(e: React.FormEvent<HTMLInputElement>) =>
								onTyping(e, 'confirmPassword')
							}
							onKeyDown={onEnter}
						>
							{hidePassword ? (
								<EyeSVG
									onClick={() => setHidePassword(false)}
								/>
							) : (
								<EyeOffSVG
									onClick={() => setHidePassword(true)}
								/>
							)}
						</MyInput>
						<div className="error">
							{error === 'Password mismatch' ? error : ''}
						</div>
					</div>
					<div className="register">
						<MyButton onClick={() => goRegister(logpass)}>
							Register
						</MyButton>
					</div>
				</MyModal>
			)
		case 'account':
			return (
				<MyModal setVisible={setVisible} className="user-auth account">
					<div className="title">
						<UserSVG />
						Account
					</div>
					<div className="info">
						<div className="row login">
							<p className="caption">Username: </p>
							<p className="value">
								{data.username}
								<EditSVG />
							</p>
						</div>
						<div className="row email">
							<p className="caption">E-mail: </p>
							<p className="value">
								{data.email}
								<EditSVG />
							</p>
						</div>
					</div>
					<div className="logout">
						<MyButton onClick={goLogout}>Log out</MyButton>
					</div>
				</MyModal>
			)
		default:
			return (
				<MyModal setVisible={setVisible} className="user-auth auth">
					<div className="title">
						<UserSVG />
						Authorization
					</div>
					<div className="info">
						{'Don`t have an account? '}
						<a onClick={goRegistrationPage}>Register here</a>
					</div>
					<div className="companies">
						<div className="item google">
							<LogoGoogleSVG />
							<p>Continue with Google</p>
						</div>
						<div className="item vk">
							<LogoVkSVG />
							<p>Continue with Vk</p>
						</div>
					</div>
					<div className="login">
						<p className="name">Login / Email:</p>
						<MyInput
							className="login-input"
							placeholder="Your login"
							value={logpass.login}
							positionPicture="right"
							onChange={(e: React.FormEvent<HTMLInputElement>) =>
								onTyping(e, 'login')
							}
							condition={
								error === 'User not found' ? 'error' : ''
							}
							onKeyDown={onEnter}
						>
							{logpass.login !== '' ? (
								<CrossInCircleSVG
									onClick={() => clearField('login')}
								/>
							) : (
								<></>
							)}
						</MyInput>
						<div className="error">
							{error === 'User not found' ? error : ''}
						</div>
					</div>
					<div className="password">
						<p className="name">Password:</p>
						<MyInput
							className="password-input"
							placeholder="Your password"
							type={hidePassword ? 'password' : 'text'}
							positionPicture="right"
							value={logpass.password}
							condition={error ? 'error' : ''}
							onChange={(e: React.FormEvent<HTMLInputElement>) =>
								onTyping(e, 'password')
							}
							onKeyDown={onEnter}
						>
							{hidePassword ? (
								<EyeSVG
									onClick={() => setHidePassword(false)}
								/>
							) : (
								<EyeOffSVG
									onClick={() => setHidePassword(true)}
								/>
							)}
						</MyInput>
						<div className="error">
							{error !== 'User not found' ? error : ''}
						</div>
					</div>
					<div className="login-and-forgot">
						<p className="forgot-password">Forgot password?</p>
						<MyButton onClick={() => goLogin(logpass)}>
							Log in
						</MyButton>
					</div>
				</MyModal>
			)
	}
}

export default UserAuth
