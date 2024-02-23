import * as React from "react";
const FilterSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g stroke="#75d6ff" strokeLinecap="round" strokeWidth={2}>
      <circle cx={7} cy={7} r={3} transform="rotate(90 7 7)" />
      <path d="M9.5 5H18a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H9.5" />
      <circle r={3} transform="matrix(0 1 1 0 17 17)" />
      <path d="M14.5 15H6a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h8.5" />
    </g>
  </svg>
);
export default FilterSvg;
