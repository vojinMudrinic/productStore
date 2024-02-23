import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
// Local imports
import styles from "./Dashboard.module.css";
import { GET_ALL_PRODUCTS, GET_CATEGORIES } from "../../routes/routes";
import Search from "../../Components/Search/Search";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loader from "../../svg/Loader";
import { Context } from "../../utils/AppContext";
import Popup from "../../Components/Popup/Popup";
import NoResultsSvg from "../../svg/NoResultsSvg";
import Filter from "../../Components/Filter/Filter";

const Dashboard = () => {
  const { popup } = useContext(Context);
  const skipCount = useRef(1);
  const observerRef = useRef();
  const [products, setProducts] = useState([]);
  const [categorioes, setCategories] = useState([]);
  const [totalReached, setTotalReached] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);

  const getProducts = useCallback(
    async (skipCount = 1) => {
      try {
        const response = await axios.get(GET_ALL_PRODUCTS, {
          params: { limit: 10, skip: (skipCount - 1) * 10 },
        });
        const data = response.data;

        setProducts((prev) => {
          const updatedData = [...prev, ...data.products];
          if (updatedData.length < data.total) {
            setTotalReached(false);
          } else {
            setTotalReached(true);
          }
          return updatedData;
        });
      } catch (err) {
        console.error(err);
      }
    },
    [setProducts]
  );

  const lastProduct = useCallback(
    (node) => {
      if (!node) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (totalReached || customSearch) return;
          skipCount.current = skipCount.current + 1;
          getProducts(skipCount.current);
        }
      });
      observerRef.current.observe(node);
    },
    [getProducts, totalReached, customSearch]
  );

  const renderProducts = useMemo(() => {
    if (products.length > 0) {
      return products.map((el, i) => (
        <ProductCard
          data={el}
          key={el.id}
          ref={i === products.length - 1 ? lastProduct : null}
        />
      ));
    } else {
      return (
        <div className={styles.noResultContainer}>
          <NoResultsSvg className={styles.noResults} />
          <h2>No results...</h2>
        </div>
      );
    }
  }, [products, lastProduct]);

  const initialFetch = useCallback(async () => {
    setCustomSearch(false);
    setTotalReached(false);
    skipCount.current = 1;
    try {
      const response = await axios.get(GET_ALL_PRODUCTS, {
        params: { limit: 10, skip: 0 },
      });
      const data = response.data;
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(GET_CATEGORIES);
        const data = response.data;
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <div className={[styles.wrapper, popup ? styles.disable : ""].join(" ")}>
        <div className={styles.searchControls}>
          <Search
            setProducts={setProducts}
            setCustomSearch={setCustomSearch}
            onReset={initialFetch}
          />
          <Filter
            options={categorioes}
            setProducts={setProducts}
            setCustomSearch={setCustomSearch}
            onReset={initialFetch}
          />
        </div>
        <div className={styles.products}>{renderProducts}</div>
        {!totalReached && products.length > 0 && !customSearch ? (
          <Loader />
        ) : null}
      </div>
      {popup ? <Popup /> : null}
    </>
  );
};

export default Dashboard;
