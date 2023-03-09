import { uniteClasses } from '../../../utils/helper'
import classes from './MyInput.module.scss'

const MyInput = ({
	children = <></>,
	positionPicture = 'left',
	condition = '',
	...props
}) => {
	return (
		<div
			className={uniteClasses([
				positionPicture === 'left'
					? classes.MyInputLeft
					: classes.MyInputRight,
				condition === 'error' && classes.MyInputError
			])}
		>
			{positionPicture === 'left' ? (
				<>
					<div className={classes.picture}>{children}</div>
					<input {...props} />
				</>
			) : (
				<>
					<input {...props} />
					<div className={classes.picture}>{children}</div>
				</>
			)}
		</div>
	)
}

export default MyInput
