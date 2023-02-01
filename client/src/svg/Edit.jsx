import * as React from "react";

const Icon = ({
  size = 48,
  strokeWidth = 1.5,
  color = "currentColor",
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
    <path d="m4.75 19.25 4.25-1 9.293-9.293a1 1 0 0 0 0-1.414l-1.836-1.836a1 1 0 0 0-1.414 0L5.75 15l-1 4.25Z" />
    <path d="M19.25 19.25h-5.5" />
  </svg>
);

export default Icon;
