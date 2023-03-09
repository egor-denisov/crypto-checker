const Icon = ({
	size = 48,
	strokeWidth = 0.1,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
			fill="currentColor"
		></path>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M6.555 6.31L1 12l5.555 5.69a7.572 7.572 0 0010.89 0L23 12l-5.555-5.69a7.572 7.572 0 00-10.89 0zM17 12a5 5 0 11-10 0 5 5 0 0110 0z"
			fill="currentColor"
		></path>
	</svg>
)

export default Icon
