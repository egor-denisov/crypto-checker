import { FC, useEffect, useRef } from 'react'
import classes from './MyFlexibleInput.module.scss'
type props = {
	value: string
	setValue: Function
	onBlur: Function
	active?: boolean
	type?: string
}
const MyFlexibleInput: FC<props> = ({
	value,
	setValue,
	onBlur,
	active,
	type
}) => {
	const ref = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (ref.current !== null)
			active ? ref.current.focus() : ref.current.blur()
	}, [active])
	return (
		<input
			type={type || 'text'}
			value={value}
			className={classes.MyFlexibleInput}
			maxLength={40}
			onFocus={(e) => e.target.select()}
			size={40}
			disabled={!active}
			onChange={(e: React.FormEvent<HTMLInputElement>) =>
				setValue(e.currentTarget.value)
			}
			onBlur={() => onBlur()}
			ref={ref}
		/>
	)
}

export default MyFlexibleInput
