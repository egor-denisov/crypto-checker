import { FC, useEffect, useState } from 'react'
import MyModal from '../UI/MyModal/MyModal'
import UserSVG from '../../svg/User'
import EditSVG from '../../svg/Edit'
import Check from '../../svg/Check'
import MyButton from '../UI/MyButton/MyButton'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MyFlexibleInput from '../UI/MyFlexibleInput/MyFlexibleInput'
import { validateEmail } from '../../utils/helper'
import { useActions } from '../../hooks/useActions'
type props = {
	setVisible: Function
	goLogout: Function
}
const Account: FC<props> = ({ setVisible, goLogout }) => {
	const { data, error } = useTypedSelector((state) => state.user)
	const { updateUser } = useActions()
	const [fieldData, setFieldData] = useState({
		username: {
			value: data.username,
			correct: true,
			active: false
		},
		email: {
			value: data.email,
			correct: true,
			active: false
		}
	})
	const ChangeValue = (
		input: keyof typeof fieldData,
		field: keyof typeof fieldData[keyof typeof fieldData],
		value: string | boolean
	) => {
		setFieldData({
			...fieldData,
			[input]: { ...fieldData[input], [field]: value }
		})
	}
	const onBlur = (input: keyof typeof fieldData) => {
		setFieldData({
			...fieldData,
			[input]: { ...fieldData[input] } // active: false, value : data[input]
		})
	}
	const onClick = (input: keyof typeof fieldData) => {
		if (fieldData[input].value !== data[input] && fieldData[input].active) {
			if (input === 'email') {
				if (fieldData[input].correct) {
					updateUser(data.id, input, fieldData[input].value)
				}
			} else {
				updateUser(data.id, input, fieldData[input].value)
			}
		}
		ChangeValue(input, 'active', !fieldData[input].active)
	}
	useEffect(() => {
		ChangeValue('email', 'correct', validateEmail(fieldData.email.value))
	}, [fieldData.email.value])
	return (
		<MyModal setVisible={setVisible} className="user-auth account">
			<div className="title">
				<UserSVG />
				Account
			</div>
			<div className="info">
				<div className="row login">
					<p className="caption">Username: </p>
					<div className="value">
						<div className="input-block">
							<div className="input-and-button">
								<MyFlexibleInput
									value={fieldData.username.value}
									setValue={(value: string) => {
										ChangeValue('username', 'value', value)
									}}
									onBlur={() => onBlur('username')}
									active={fieldData.username.active}
								/>
								<div
									className="button"
									onClick={() => onClick('username')}
								>
									{fieldData.username.active ? (
										<Check />
									) : (
										<EditSVG />
									)}
								</div>
							</div>
							<div className="error">
								{error === 'Email already in use' ? error : ''}
							</div>
						</div>
					</div>
				</div>
				<div className="row email">
					<p className="caption">E-mail: </p>
					<div className="value">
						<div className="input-block">
							<div className="input-and-button">
								<MyFlexibleInput
									value={fieldData.email.value}
									setValue={(value: string) => {
										ChangeValue('email', 'value', value)
									}}
									onBlur={() => onBlur('email')}
									active={fieldData.email.active}
								/>
								<div
									className="button"
									onClick={() => onClick('email')}
								>
									{fieldData.email.active ? (
										<Check />
									) : (
										<EditSVG />
									)}
								</div>
							</div>
							<div className="error">
								{error === 'Email already in use'
									? error
									: !fieldData.email.correct
									? 'Email is uncorrect'
									: ''}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="logout">
				<MyButton onClick={goLogout}>Log out</MyButton>
			</div>
		</MyModal>
	)
}

export default Account
