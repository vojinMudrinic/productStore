import * as React from "react";
const BackSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="#fff" d="M0 0h24v24H0z" />
    <path
      fill="#75d6ff"
      fillRule="evenodd"
      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.707-2.293a1 1 0 0 0-1.414-1.414L7.38 11.206l-.044.046a.998.998 0 0 0 0 1.496l.044.046 2.913 2.913a1 1 0 0 0 1.414-1.414L10.414 13H16a1 1 0 1 0 0-2h-5.586l1.293-1.293Z"
      clipRule="evenodd"
    />
  </svg>
);
export default BackSvg;
