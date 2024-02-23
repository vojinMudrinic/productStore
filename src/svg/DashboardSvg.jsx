import * as React from "react";
const DashboardSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 400 400"
    {...props}
  >
    <path
      d="M0 652.362v116h116v-116H0zm141 0v116h116v-116H141zm141 0v116h118v-116H282zm-282 141v116h116v-116H0zm141 0v116h116v-116H141zm141 0v116h118v-116H282zm-282 141v118h116v-118H0zm141 0v118h116v-118H141zm141 0v118h118v-118H282z"
      style={{
        opacity: 1,
        fill: "#75d6ff",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 1,
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        strokeDashoffset: 0,
        strokeOpacity: 1,
      }}
      transform="translate(0 -652.362)"
    />
  </svg>
);
export default DashboardSvg;
