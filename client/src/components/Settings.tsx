import { FC, useState } from 'react'
import MyModal from './UI/MyModal/MyModal'
import SettingsSVG from '../svg/Settings'
import MyToogle from './UI/MyToogle/MyToogle'

type props = {
	visible: boolean
	setVisible: Function
}
const Settings: FC<props> = ({ visible, setVisible }) => {
	const [setting, setSetting] = useState({
		language: 'EN',
		currency: 'USD',
		colorMode: 'Light'
	})
	const changeLanguage = () =>
		setSetting({
			...setting,
			language: setting.language === 'EN' ? 'RU' : 'EN'
		})
	const changeCurrency = () =>
		setSetting({
			...setting,
			currency: setting.currency === 'USD' ? 'RUB' : 'USD'
		})
	const changeColorMode = () =>
		setSetting({
			...setting,
			colorMode: setting.colorMode === 'Dark' ? 'Light' : 'Dark'
		})
	if (!visible) return <></>
	return (
		<MyModal setVisible={setVisible} className="setting">
			<div className="title">
				<SettingsSVG />
				Settings
			</div>
			<div className="row language">
				<p className="caption">Language: </p>
				<div className="value">
					<MyToogle
						firstItem="EN"
						secondItem="RU"
						firstIsActive={setting.language === 'EN'}
						changer={changeLanguage}
					/>
				</div>
			</div>
			<div className="row currency">
				<p className="caption">Currency: </p>
				<div className="value">
					<MyToogle
						firstItem="USD"
						secondItem="RUB"
						firstIsActive={setting.currency === 'USD'}
						changer={changeCurrency}
					/>
				</div>
			</div>
			<div className="row colormode">
				<p className="caption">Color mode: </p>
				<div className="value">
					<MyToogle
						firstItem="Dark"
						secondItem="Light"
						firstIsActive={setting.colorMode === 'Dark'}
						changer={changeColorMode}
					/>
				</div>
			</div>
		</MyModal>
	)
}

export default Settings
