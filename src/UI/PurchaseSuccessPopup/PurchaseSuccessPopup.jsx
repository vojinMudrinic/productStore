import React from "react";
// Local imports
import styles from "./PurchaseSuccessPopup.module.css";
import useWindowWidth from "../../utils/custom-hooks";
import Button from "../Button/Button";
import CheckmarkSvg from "../../svg/CheckmarkSvg";

const PurchaseSuccessPopup = ({ onClose }) => {
  const { windowWidth } = useWindowWidth();
  const isMobile = windowWidth <= 425;
  return (
    <div
      className={[styles.popup, isMobile ? styles.responsivePopup : ""].join(
        " "
      )}
    >
      <h1>Purchase success</h1>
      <CheckmarkSvg />
      <Button text={"Confirm"} onClick={onClose} className={styles.button} />
    </div>
  );
};

export default PurchaseSuccessPopup;
