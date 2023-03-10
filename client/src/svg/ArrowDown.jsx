const Icon = ({
	size = 48,
	strokeWidth = 1.5,
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
		<path d="M17.25 13.75 12 19.25l-5.25-5.5" />
		<path d="M12 18.25V4.75" />
	</svg>
)

export default Icon
