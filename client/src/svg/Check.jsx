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
		<path d="m5.75 12.867 2.59 3.547a2 2 0 0 0 3.26-.043l6.65-9.621" />
	</svg>
)

export default Icon
