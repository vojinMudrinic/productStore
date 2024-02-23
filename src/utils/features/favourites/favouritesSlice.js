import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFavourite: (state, action) => {
      const newItems = state.items.filter(
        (el) => Number(el.id) !== Number(action.payload)
      );
      state.items = newItems;
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
