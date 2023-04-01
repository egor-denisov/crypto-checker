import { FC, useEffect, useState } from 'react'
import classes from './MyNumber.module.scss'
type props = {
	value: string | number
	changeNumber: Function
}
const MyNumber: FC<props> = ({ value, changeNumber }) => {
	const [tempValue, setTempValue] = useState(String(value))
	const [step, setStep] = useState(
		1 / 10 ** (String(value).split('.')[1]?.length || 0)
	)
	const onChange = (e: React.FormEvent<HTMLInputElement>) => {
		const alpha = '.0123456789'
		const str = e.currentTarget.value
		let correct = true
		for (let i = 0; i < str.length; i++) {
			if (!alpha.includes(str[i])) correct = false
		}
		if (
			correct &&
			str.indexOf('.') === str.lastIndexOf('.') &&
			str[0] !== '.'
		) {
			changeNumber(str)
			setTempValue(str)
			setStep(1 / 10 ** (str.split('.')[1]?.length || 0))
		}
	}
	const decrease = () => {
		const res = (Number(value) - step).toFixed(8)
		if (Number(res) >= 0) {
			changeNumber(res)
		}
	}
	const increase = () => {
		const res = (Number(value) + step).toFixed(8)
		changeNumber(res)
	}
	useEffect(() => {
		const currentDiffStep = Math.abs(Number(tempValue) - Number(value))
		if (currentDiffStep > 1 || currentDiffStep === Number(value)) {
			setStep(1 / 10 ** (String(value).split('.')[1]?.length || 0))
		}
		setTempValue(String(value))
	}, [value])
	return (
		<div className={classes.MyNumber}>
			<div className={classes.numberMinus} onClick={decrease}>
				-
			</div>
			<input
				className={classes.number}
				value={String(tempValue)}
				onChange={onChange}
			/>
			<div className={classes.numberPlus} onClick={increase}>
				+
			</div>
		</div>
	)
}

export default MyNumber
