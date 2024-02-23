import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
// Local imports
import styles from "./CartItem.module.css";
import QuantityControls from "../../UI/QuantityControls/QuantityControls";
import RemoveSvg from "../../svg/RemoveSvg";
import { formatPrice } from "../../utils/helpers";
import { removeFromCart } from "../../utils/features/cart/cartSlice";

const CartItem = ({ title, price, initialQuantity, id }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setQuantity((prev) => prev - 1);
  }, []);

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={styles.title}>
          <span>{title}</span>
          <span className={styles.price}>{formatPrice(price * quantity)}</span>
        </div>
        <RemoveSvg
          onClick={() => dispatch(removeFromCart(id))}
          className={styles.remove}
        />
      </div>
      <QuantityControls
        quantity={quantity}
        onIncrement={increment}
        onDecrement={decrement}
      />
    </div>
  );
};

export default CartItem;
