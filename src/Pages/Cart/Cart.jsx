import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Local imports
import styles from "./Cart.module.css";
import CartItem from "../../Components/CartItem/CartItem";
import EmptyCartSvg from "../../svg/EmptyCartSvg";
import Button from "../../UI/Button/Button";
import useWindowWidth from "../../utils/custom-hooks";
import { clearCart } from "../../utils/features/cart/cartSlice";
import PurchaseSuccessPopup from "../../UI/PurchaseSuccessPopup/PurchaseSuccessPopup";
import { useForm } from "react-hook-form";

const Cart = () => {
  const { windowWidth } = useWindowWidth();
  const isMobile = windowWidth <= 425;
  const dispatch = useDispatch();
  const items = useSelector(({ cart }) => cart.items);
  const userData = useSelector(({ user }) => user.userData);
  const [successPopup, setSuccessPopup] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderItems = () => {
    if (items.length <= 0) return;
    return items.map((el) => (
      <div key={el.id}>
        <CartItem
          id={el.id}
          title={el.title}
          initialQuantity={el.quantity}
          price={el.price}
        />
      </div>
    ));
  };

  const handlePurchase = () => {
    dispatch(clearCart());
    setSuccessPopup(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className={[
          styles.wrapper,
          isMobile ? styles.wrapperResponsive : "",
          successPopup ? styles.disable : "",
        ].join(" ")}
      >
        <h1>Checkout</h1>
        {items.length > 0 && userData ? (
          <div
            className={[
              styles.container,
              isMobile ? styles.containerResponsive : "",
            ].join(" ")}
          >
            <form
              className={[
                styles.form,
                isMobile ? styles.formResponsive : "",
              ].join(" ")}
              onSubmit={handleSubmit(handlePurchase)}
            >
              <h2>Form</h2>
              <div className={styles.inputContainer}>
                <input
                  {...register("address", { required: "Address required" })}
                  placeholder="Address"
                  type="text"
                  className={errors.address ? styles.error : ""}
                />
                {errors.address ? (
                  <span className={styles.errorMsg}>
                    {errors.address.message}
                  </span>
                ) : null}
              </div>
              <div className={styles.inputContainer}>
                <input
                  {...register("phone", { required: "Phone required" })}
                  placeholder="Phone"
                  type="tel"
                  className={errors.phone ? styles.error : ""}
                />
                {errors.phone ? (
                  <span className={styles.errorMsg}>
                    {errors.phone.message}
                  </span>
                ) : null}
              </div>
              <textarea placeholder="Message" />
              <Button text={"Confirm purchase"} type={"submit"} />
            </form>
            <div
              className={[
                styles.items,
                isMobile ? styles.itemsResponsive : "",
              ].join(" ")}
            >
              <h2>Items in cart {items.length || 0}</h2>
              <div className={styles.itemsList}>{renderItems()}</div>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <EmptyCartSvg />
            <h2>No items in cart</h2>
          </div>
        )}
      </div>
      {successPopup ? (
        <PurchaseSuccessPopup onClose={() => setSuccessPopup(false)} />
      ) : null}
    </>
  );
};

export default Cart;
