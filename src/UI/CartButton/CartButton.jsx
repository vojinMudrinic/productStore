import React from "react";
import PropType from "prop-types";
// Local imports
import styles from "./CartButton.module.css";
import CartAddSvg from "../../svg/CartAddSvg";

const CartButton = ({ onClick = () => {} }) => {
  return (
    <div className={styles.addToCart} onClick={onClick}>
      <CartAddSvg />
      <span>Add to cart</span>
    </div>
  );
};

CartButton.prototypes = {
  onClick: PropType.func.isRequired,
};

export default CartButton;
