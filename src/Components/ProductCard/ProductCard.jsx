import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Local imports
import styles from "./ProductCard.module.css";
import Favourite from "../Favourite/Favourite";
import { ADD_CART } from "../../routes/routes";
import CartButton from "../../UI/CartButton/CartButton";
import { Context } from "../../utils/AppContext";
import QuantityControls from "../../UI/QuantityControls/QuantityControls";
import { formatPrice } from "../../utils/helpers";
import { addToCart } from "../../utils/features/cart/cartSlice";

const ProductCard = React.forwardRef(({ data = {} }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(({ user }) => user.userData);
  const items = useSelector(({ cart }) => cart.items);
  const { setGlobalLoader, setPopup, setCartData } = useContext(Context);
  const { id, title, price, thumbnail } = data || {};
  const [quantity, setQuantity] = useState(1);
  const alreadyInCart = items.find((el) => Number(el.id) === Number(id));

  const increment = useCallback((e) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  }, []);

  const decrement = useCallback((e) => {
    e.stopPropagation();
    setQuantity((prev) => prev - 1);
  }, []);

  const onCardClickHandler = () => {
    navigate("/product/" + id);
  };

  const addToCartHandler = async (e) => {
    e.stopPropagation();
    setPopup(true);
    if (!userData) return;
    try {
      setGlobalLoader(true);
      const response = await axios.post(ADD_CART, {
        userId: 1,
        products: [
          {
            id,
            quantity,
          },
        ],
      });
      const data = response.data;

      if (data) {
        setCartData(data);
        dispatch(addToCart(data.products[0]));
        setGlobalLoader(false);
      }
    } catch (error) {
      console.error(error);
      setGlobalLoader(false);
      setPopup(false);
    }
  };
  return (
    <div className={styles.container} ref={ref} onClick={onCardClickHandler}>
      <Favourite className={styles.favourite} data={data} />
      <img src={thumbnail} alt="product_img" className={styles.productImage} />
      <span className={styles.title}>{title}</span>
      <span className={styles.price}>{formatPrice(price)}</span>
      {!alreadyInCart || !userData ? (
        <>
          <QuantityControls
            quantity={quantity}
            onIncrement={increment}
            onDecrement={decrement}
          />
          <CartButton onClick={addToCartHandler} />
        </>
      ) : (
        <div className={styles.inCart}>
          <span>Item in cart</span>
        </div>
      )}
    </div>
  );
});

export default ProductCard;
