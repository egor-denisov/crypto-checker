export const uniteClasses = (classes: (string | boolean)[]): string => {
	return classes.join(' ')
}
export const isExist = (x: any): boolean => {
	return x !== undefined
}
export const validateEmail = (email: string): boolean => {
	if (isExist(email) && email !== null)
		return (
			email.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			) !== null
		)
	return false
}
export const zerosAfterPoint = (number: number, count: number): string => {
	return (Math.floor(number * 10 ** count) / 10 ** count).toFixed(count)
}
export const getBigNumber = (number: number): string => {
	switch (true) {
		case number > 100000000:
			return zerosAfterPoint(number / 1000000000, 3) + 'B'
		case number > 1000000:
			return zerosAfterPoint(number / 1000000, 3) + 'M'
		case number > 1000:
			return zerosAfterPoint(number / 1000, 3) + 'K'
		default:
			return zerosAfterPoint(number, 3)
	}
}
