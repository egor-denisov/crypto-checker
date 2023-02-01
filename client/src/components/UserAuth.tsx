import React, { FC, useEffect, useState } from 'react';
import UserSVG from '../svg/User'
import MyInput from './UI/MyInput/MyInput';
import EyeSVG from '../svg/Eye'
import EyeOffSVG from '../svg/EyeOff'
import LogoVkSVG from '../svg/LogoVK'
import LogoGoogleSVG from '../svg/LogoGoogle'
import CrossInCircleSVG from '../svg/CrossInCircle'
import MyButton from './UI/MyButton/MyButton';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';
import { logpassType } from '../types/userTypes';
import MyModal from './UI/MyModal/MyModal';

type props = {
    visible: boolean, 
    setVisible: Function
}
const UserAuth: FC<props> = ({visible, setVisible}) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [condition, setCondition] = useState('signin')
    const [logpass, setLogpass] = useState({login: '', password: ''})
    const {error, data} = useTypedSelector(state => state.user)
    const {checkUser, setErrorAtAuth} = useActions()
    
    const goLogin = (logpass: logpassType) => {
        if(logpass.password === "") setErrorAtAuth('Password field is empty')
        else checkUser(logpass)
    }
    const onTyping = (e: React.FormEvent<HTMLInputElement>, field: keyof typeof logpass) => {
        setLogpass({...logpass, [field]: e.currentTarget.value})
    }
    const onEnter = (e: React.KeyboardEvent) => {
        if(e.keyCode === 13) goLogin(logpass)
    }
    const clearLoginField = () => setLogpass({...logpass, login: ""})
    const goRegistrationPage = () => setCondition('registration')
    useEffect(() => {
        if(error === "" && data.id !== -1){
            setVisible(false)
            setCondition('account')
        }
    }, [error, data.id])
    if(!visible) return <></>
    switch(condition){
        case('registration'):
            return (
                <MyModal setVisible={setVisible} className="user-auth">
                        <div className="title"><UserSVG/>Registration</div>
                        <div className='info'>Have an account? <a onClick={() => setCondition('signin')}>Sign in here</a></div>
                </MyModal>
            )
        case('account'):
            return (
                <MyModal setVisible={setVisible} className="user-auth">
                        <div className="title"><UserSVG/>Account</div>
                        <div className='login'>{data.username}</div>
                </MyModal>
            )
        default:
            return (
                <MyModal setVisible={setVisible} className="user-auth">
                        <div className="title"><UserSVG/>Authorization</div>
                        <div className='info'>
                            Don`t have an account? 
                            <a onClick={goRegistrationPage}>Register here</a>
                        </div>
                        <div className="companies">
                            <div className="item google">
                                <LogoGoogleSVG/>
                                <p>Continue with Google</p>
                                </div>
                            <div className="item vk">
                                <LogoVkSVG/>
                                <p>Continue with Vk</p>
                            </div>
                        </div>
                        <div className="login">
                            <p className="name">Login / Email:</p>
                            <MyInput className="login-input" 
                                     placeholder="Your login" 
                                     value={logpass.login} 
                                     positionPicture="right"
                                     onChange={(e: React.FormEvent<HTMLInputElement>) => onTyping(e, "login")}
                                     condition={error === "User not found" ? "error" : ""}
                                     onKeyDown={onEnter}>
                                        {logpass.login !== "" ? <CrossInCircleSVG onClick={clearLoginField}/> : <></>}
                            </MyInput>
                            <div className='error'>{error === "User not found" ? error : ""}</div>
                        </div>
                        <div className="password">
                            <p className="name">Password:</p>
                            <MyInput className="password-input" 
                                     placeholder="Your password" 
                                     type={hidePassword ?"password" :"text"}
                                     positionPicture="right"
                                     value={logpass.password}
                                     condition={error ? "error" : ""}
                                     onChange={(e: React.FormEvent<HTMLInputElement>) => onTyping(e, "password")}
                                     onKeyDown={onEnter}>
                                     {hidePassword
                                        ? <EyeSVG onClick={() => setHidePassword(false)}/>
                                        : <EyeOffSVG onClick={() => setHidePassword(true)}/>
                                     }
                            </MyInput>
                            <div className='error'>{error !== "User not found" ? error : ""}</div>
                        </div>
                        <div className="login-and-forgot">
                            <p className='forgot-password'>Forgot password?</p>
                            <MyButton onClick={() => goLogin(logpass)}>Log in</MyButton>
                        </div>
                </MyModal>
            );
    }
    
};

export default UserAuth;