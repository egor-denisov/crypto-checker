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
	onTyping: Function
	onEnter: Function
	clearField: Function
	setHidePassword: Function
	goRegistrationPage: Function
	goLogin: Function
	logpass: logpassType
	hidePassword: boolean
}
const Authorization: FC<props> = ({
	setVisible,
	onTyping,
	onEnter,
	clearField,
	setHidePassword,
	goRegistrationPage,
	goLogin,
	logpass,
	hidePassword
}) => {
	const { error } = useTypedSelector((state) => state.user)
	return (
		<MyModal setVisible={setVisible} className="user-auth auth">
			<div className="title">
				<UserSVG />
				Authorization
			</div>
			<div className="info">
				{'Don`t have an account? '}
				<a onClick={() => goRegistrationPage()}>Register here</a>
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
					condition={error === 'User not found' ? 'error' : ''}
					onKeyDown={onEnter}
				>
					{logpass.login !== '' ? (
						<CrossInCircleSVG onClick={() => clearField('login')} />
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
						<EyeSVG onClick={() => setHidePassword(false)} />
					) : (
						<EyeOffSVG onClick={() => setHidePassword(true)} />
					)}
				</MyInput>
				<div className="error">
					{error !== 'User not found' ? error : ''}
				</div>
			</div>
			<div className="login-and-forgot">
				<p className="forgot-password">Forgot password?</p>
				<MyButton onClick={() => goLogin(logpass)}>Log in</MyButton>
			</div>
		</MyModal>
	)
}

export default Authorization
