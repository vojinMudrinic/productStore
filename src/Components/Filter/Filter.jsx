import { useRef } from "react";
import axios from "axios";
// Local imports
import styles from "./Filter.module.css";
import FilterSvg from "../../svg/FilterSvg";
import { GET_FILTER_CATEGORY } from "../../routes/routes";
import { formatText } from "../../utils/helpers";

const Filter = ({
  options = [],
  setProducts = () => {},
  setCustomSearch = () => {},
  onReset = () => {},
}) => {
  const selectRef = useRef();

  const searchFilter = async () => {
    try {
      setCustomSearch(true);
      const selected =
        selectRef.current.options[selectRef.current.selectedIndex].value;

      if (selected === "all") {
        onReset();
        return;
      } else {
        const route = `${GET_FILTER_CATEGORY}${selected}`;
        const response = await axios.get(route);
        const data = response.data;
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderOptions = () => {
    return options.map((el, i) => {
      return (
        <option value={el} key={i}>
          {formatText(el)}
        </option>
      );
    });
  };

  return (
    <div className={styles.container}>
      <FilterSvg />
      <select ref={selectRef} onChange={searchFilter}>
        <option value={"all"}>All</option>
        {renderOptions()}
      </select>
    </div>
  );
};

export default Filter;
