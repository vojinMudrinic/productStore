import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// Local imports
import styles from "./Product.module.css";
import { GET_PRODUCT } from "../../routes/routes";
import Favourite from "../../Components/Favourite/Favourite";
import BackSvg from "../../svg/BackSvg";
import { formatPrice, formatText } from "../../utils/helpers";
import Loader from "../../svg/Loader";
import useWindowWidth from "../../utils/custom-hooks";

const Product = () => {
  const { windowWidth } = useWindowWidth();
  const isMobile = windowWidth <= 425;
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const { title, thumbnail, description, price, rating, stock, category } =
    data || {};

  useEffect(() => {
    const getProductInfo = async () => {
      setLoader(true);
      try {
        const response = await axios.get(`${GET_PRODUCT}${id}`);
        const data = response.data;
        setData(data);
        setLoader(false);
      } catch (err) {
        setLoader(false);
        console.error(err);
      } finally {
        setLoader(false);
      }
    };
    getProductInfo();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoContainer}>
        {!loader ? (
          <>
            <div className={styles.imgContainer}>
              <img
                src={thumbnail}
                alt="product_image"
                className={[
                  styles.image,
                  isMobile ? styles.imageResponsive : "",
                ].join(" ")}
              />
            </div>

            <div className={styles.details}>
              <div className={styles.title}>
                <h1>{title}</h1>
                <Favourite
                  data={{ ...data, id }}
                  className={styles.favourite}
                />
              </div>
              <div className={styles.section}>
                <h3>About</h3>
                <span>{description}</span>
              </div>
              <div className={styles.section}>
                <h3>Price</h3>
                <span>{formatPrice(price)}</span>
              </div>
              <div className={styles.section}>
                <h3>Rating</h3>
                <span>{rating} / 5</span>
              </div>
              <div className={styles.section}>
                <h3>Category</h3>
                <span>{formatText(category)}</span>
              </div>
              <div className={styles.section}>
                <h3>In stock</h3>
                <span>{stock} </span>
              </div>
              <div className={styles.controls}>
                <div className={styles.back} onClick={() => navigate("/")}>
                  <BackSvg />
                  <span>Back to dashboard</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>
    </div>
  );
};

export default Product;
