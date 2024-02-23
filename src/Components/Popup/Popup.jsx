import { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Local imports
import styles from "./Popup.module.css";
import { Context } from "../../utils/AppContext";
import Loader from "../../svg/Loader";
import CloseSvg from "../../svg/CloseSvg";
import Button from "../../UI/Button/Button";
import { formatPrice } from "../../utils/helpers";
import useWindowWidth from "../../utils/custom-hooks";

const Popup = () => {
  const userData = useSelector(({ user }) => user.userData);
  const { windowWidth } = useWindowWidth();
  const isMobile = windowWidth <= 425;
  const navigate = useNavigate();
  const { globalLoader, setPopup, cartData } = useContext(Context);
  const { products, totalQuantity } = cartData || {};
  const popupRef = useRef();

  const closePopup = useCallback(() => {
    setPopup(false);
  }, [setPopup]);

  const navigateToCheckout = () => {
    navigate("/cart");
    setPopup(false);
  };

  const navigateToLogin = () => {
    navigate("/login");
    setPopup(false);
  };

  const renderText = () => {
    if (userData) {
      return (
        <>
          <h2>Item added to cart</h2>
          <div className={styles.itemDetails}>
            <h3>Item details:</h3>
            <div
              className={[
                styles.detailContainer,
                isMobile ? styles.detailContainerResponsive : "",
              ].join(" ")}
            >
              <div className={styles.detail}>
                <span>Name:</span>
                <span>{products[0].title}</span>
              </div>
              <div className={styles.detail}>
                <span>Price:</span>
                <span>{formatPrice(products[0].price)}</span>
              </div>
              <div className={styles.detailQuantity}>
                <div className={styles.detail}>
                  <span>Quantity:</span>
                  <span>{totalQuantity}</span>
                </div>
                <div className={styles.detail}>
                  <span> Total:</span>
                  <span> {formatPrice(totalQuantity * products[0].price)}</span>
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                text={"Proceed to checkout"}
                onClick={navigateToCheckout}
              />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className={styles.unauthorized}>
          <h2>In order to add items to cart, please login</h2>
          <Button text={"Login"} onClick={navigateToLogin} />
        </div>
      );
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        closePopup();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [closePopup]);

  return (
    <div
      className={[styles.popup, isMobile ? styles.responsivePopup : ""].join(
        " "
      )}
      ref={popupRef}
    >
      {globalLoader ? (
        <Loader className={styles.loader} />
      ) : (
        <>
          <CloseSvg
            className={[
              styles.close,
              isMobile ? styles.closeResponsive : "",
            ].join(" ")}
            onClick={closePopup}
          />
          {renderText()}
        </>
      )}
    </div>
  );
};

export default Popup;
