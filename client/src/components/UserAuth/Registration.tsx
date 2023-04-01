import { FC } from 'react'
import MyModal from '../UI/MyModal/MyModal'
import UserSVG from '../../svg/User'
import EyeSVG from '../../svg/Eye'
import EyeOffSVG from '../../svg/EyeOff'
import LogoVkSVG from '../../svg/LogoVK'
import LogoGoogleSVG from '../../svg/LogoGoogle'
import CrossInCircleSVG from '../../svg/CrossInCircle'
import MyInput from '../UI/MyInput/MyInput'
import MyButton from '../UI/MyButton/MyButton'
import { logpassType } from '../../types/userTypes'
import { useTypedSelector } from '../../hooks/useTypedSelector'
type props = {
	setVisible: Function
	setCondition: Function
	onTyping: Function
	onEnter: Function
	clearField: Function
	setHidePassword: Function
	goRegister: Function
	logpass: logpassType
	hidePassword: boolean
}
const Registration: FC<props> = ({
	setVisible,
	setCondition,
	onTyping,
	onEnter,
	clearField,
	setHidePassword,
	goRegister,
	logpass,
	hidePassword
}) => {
	const { error } = useTypedSelector((state) => state.user)
	return (
		<MyModal setVisible={setVisible} className="user-auth registration">
			<div className="title">
				<UserSVG />
				Registration
			</div>
			<div className="info">
				Have an account?{' '}
				<a onClick={() => setCondition('signin')}>Sign in here</a>
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
						['Wrong login', 'Login already registered'].includes(
							error
						)
							? 'error'
							: ''
					}
					onKeyDown={onEnter}
				>
					{logpass.login !== '' ? (
						<CrossInCircleSVG onClick={() => clearField('login')} />
					) : (
						<></>
					)}
				</MyInput>
				<div className="error">
					{['Wrong login', 'Login already registered'].includes(error)
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
						<CrossInCircleSVG onClick={() => clearField('email')} />
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
						<EyeSVG onClick={() => setHidePassword(false)} />
					) : (
						<EyeOffSVG onClick={() => setHidePassword(true)} />
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
					condition={error === 'Password mismatch' ? 'error' : ''}
					onChange={(e: React.FormEvent<HTMLInputElement>) =>
						onTyping(e, 'confirmPassword')
					}
					onKeyDown={onEnter}
				>
					{hidePassword ? (
						<EyeSVG onClick={() => setHidePassword(false)} />
					) : (
						<EyeOffSVG onClick={() => setHidePassword(true)} />
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
}

export default Registration
