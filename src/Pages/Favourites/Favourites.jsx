import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Local imports
import styles from "./Favourites.module.css";
import RemoveSvg from "../../svg/RemoveSvg";
import { removeFavourite } from "../../utils/features/favourites/favouritesSlice";
import NoResultsSvg from "../../svg/NoResultsSvg";
import Button from "../../UI/Button/Button";

const Favourites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favourites = useSelector(({ favourites }) => favourites.items);

  const navigationHandler = (id) => {
    navigate("../product/" + id);
  };

  const renderList = () => {
    if (favourites.length > 0) {
      return favourites.map((el) => (
        <div className={styles.item} key={el.id}>
          <div className={styles.controls}>
            <span>{el.title}</span>
            <Button
              text={"View item"}
              onClick={() => navigationHandler(el.id)}
            />
          </div>
          <RemoveSvg
            className={styles.close}
            onClick={() => dispatch(removeFavourite(el.id))}
          />
        </div>
      ));
    } else {
      return (
        <div className={styles.noResultsContainer}>
          <NoResultsSvg className={styles.noResults} />
          <h2>No favourites</h2>
        </div>
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Favourites</h1>
      <div className={styles.listContainer}>{renderList()}</div>
    </div>
  );
};

export default Favourites;
