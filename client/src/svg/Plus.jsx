const Icon = ({
	size = 48,
	strokeWidth = 1.5,
	color = 'currentColor',
	rotate45 = false,
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
		style={{ transform: `rotate(${rotate45 ? 45 : 0}deg)` }}
		{...props}
	>
		<path d="M12 5.75v12.5" />
		<path d="M18.25 12H5.75" />
	</svg>
)

export default Icon
