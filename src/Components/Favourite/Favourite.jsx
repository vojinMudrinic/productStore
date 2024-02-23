import React from "react";
import { useDispatch, useSelector } from "react-redux";
// Local imports
import FavouriteEmptySvg from "../../svg/FavouriteEmptySvg";
import FavouriteSvg from "../../svg/FavouriteSvg";
import {
  addFavourite,
  removeFavourite,
} from "../../utils/features/favourites/favouritesSlice";

const Favourite = ({ className, data }) => {
  const dispatch = useDispatch();
  const favourites = useSelector(({ favourites }) => favourites.items);

  const { id, title, price, thumbnail } = data || {};
  const isFavourite = favourites.find((el) => Number(el.id) === Number(id));

  const addToFavourite = (e) => {
    e.stopPropagation();
    const favouriteObj = { id, title, price, thumbnail };
    dispatch(addFavourite(favouriteObj));
  };

  const removFromFavourite = (e) => {
    e.stopPropagation();
    dispatch(removeFavourite(id));
  };

  return (
    <>
      {isFavourite ? (
        <FavouriteSvg className={className} onClick={removFromFavourite} />
      ) : (
        <FavouriteEmptySvg className={className} onClick={addToFavourite} />
      )}
    </>
  );
};

export default Favourite;
