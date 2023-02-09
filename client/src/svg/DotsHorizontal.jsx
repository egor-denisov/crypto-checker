import * as React from "react";

const Icon = ({ size = 48, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path d="M9 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <path d="M17 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </svg>
);

export default Icon;
