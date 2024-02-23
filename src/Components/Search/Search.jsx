import { useRef } from "react";
import axios from "axios";
// Local imports
import styles from "./Search.module.css";
import SearchSvg from "../../svg/SearchSvg";
import { SEARCH_PRODUCTS } from "../../routes/routes";

const Search = ({
  setProducts = () => {},
  setCustomSearch = () => {},
  onReset = () => {},
}) => {
  const searchRef = useRef();

  const handleSearch = async () => {
    if (!searchRef.current.value) {
      onReset();
      return;
    }
    try {
      const response = await axios.get(
        `${SEARCH_PRODUCTS}?q=${searchRef.current.value}`
      );
      setCustomSearch(true);
      const data = response.data;
      setProducts(data.products);
      searchRef.current.value = "";
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.container}>
      <SearchSvg className={styles.svg} onClick={handleSearch} />
      <input
        className={styles.input}
        placeholder="Search..."
        ref={searchRef}
        onBlur={() => {
          searchRef.current.value = searchRef.current.value.trim();
        }}
      />
    </div>
  );
};

export default Search;
