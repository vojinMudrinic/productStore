import React from "react";
// Local imports
import styles from "./QuantityControls.module.css";
import MinusSvg from "../../svg/MinusSvg";
import PlusSvg from "../../svg/PlusSvg";

const QuantityControls = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className={styles.quantityControls}>
      {quantity > 1 ? <MinusSvg onClick={onDecrement} /> : null}
      <span>{quantity}</span>
      <PlusSvg onClick={onIncrement} />
    </div>
  );
};

export default QuantityControls;
