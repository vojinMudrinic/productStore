import React from "react";
// Local imports
import styles from "./Button.module.css";

const Button = ({ text, className, type = "button", onClick }) => {
  return (
    <button
      className={[styles.container, className].join(" ")}
      onClick={onClick}
      type={type}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
