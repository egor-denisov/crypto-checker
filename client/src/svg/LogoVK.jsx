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
    fill={color}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 455 455"
    xmlns="http://www.w3.org/2000/svg"
    style={{enableBackground:"new 0 0 455 455"}}
    {...props}
  >
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M0,0v455h455V0H0z M341.098,251.727c10.445,10.19,21.49,19.784,30.865,31.049
	c4.142,4.978,8.06,10.113,11.046,15.881c4.239,8.264,0.397,17.318-6.985,17.817l-45.875-0.02
	c-11.841,0.973-21.277-3.801-29.235-11.902c-6.328-6.45-12.243-13.354-18.352-20.023c-2.486-2.746-5.115-5.314-8.239-7.362
	c-6.267-4.061-11.703-2.828-15.285,3.699c-3.643,6.649-4.499,14.031-4.835,21.435c-0.499,10.807-3.76,13.634-14.607,14.154
	c-23.208,1.075-45.218-2.451-65.659-14.134c-18.052-10.307-32.022-24.879-44.184-41.356
	c-23.702-32.124-41.855-67.391-58.154-103.673c-3.684-8.177-0.993-12.559,7.999-12.717c14.99-0.296,29.974-0.26,44.943-0.02
	c6.089,0.102,10.129,3.582,12.458,9.334c8.101,19.906,18.01,38.85,30.448,56.427c3.327,4.677,6.71,9.334,11.504,12.636
	c5.314,3.663,9.375,2.466,11.881-3.485c1.595-3.78,2.293-7.8,2.629-11.841c1.192-13.833,1.335-27.681-0.718-41.473
	c-1.274-8.621-6.149-14.195-14.745-15.825c-4.382-0.836-3.725-2.446-1.615-4.958c3.704-4.315,7.189-7.006,14.093-7.006h51.847
	c8.177,1.595,10.011,5.278,11.122,13.497l0.041,57.619c-0.097,3.184,1.595,12.615,7.306,14.704
	c4.575,1.513,7.622-2.171,10.368-5.075c12.417-13.176,21.277-28.756,29.194-44.877c3.505-7.087,6.532-14.449,9.477-21.817
	c2.17-5.452,5.553-8.137,11.703-8.04l49.916,0.061c1.472,0,2.986,0,4.438,0.239c8.396,1.452,10.705,5.075,8.096,13.293
	c-4.076,12.875-12.06,23.625-19.84,34.391c-8.341,11.525-17.216,22.647-25.495,34.233
	C331.087,237.201,331.683,242.535,341.098,251.727z"/>

  </svg>
);

export default Icon;