import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import favouritesReducer from "./features/favourites/favouritesSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
    user: userReducer,
  },
});
