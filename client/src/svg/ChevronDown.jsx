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
		<path d="M15.25 10.75 12 14.25l-3.25-3.5" />
	</svg>
)

export default Icon
