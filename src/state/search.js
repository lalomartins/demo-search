import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "empty",
  searchString: "",
  page: 1,
  ranking: "engine_autoselect",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    newSearch(state, action) {
      state.searchString = action.payload;
      state.page = 1;
    },
    gotoPage(state, action) {
      state.page = action.payload;
    },
    setRankingProfile(state, action) {
      state.ranking = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { newSearch, gotoPage, setRankingProfile } = searchSlice.actions;

export default searchSlice.reducer;
