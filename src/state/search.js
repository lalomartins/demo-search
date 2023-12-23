import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "empty",
  searchString: "",
  page: 1,
  ranking: "engine_autoselect",
  results: null,
  suspender: null,
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
      state.page = 1;
    },
    startLoad(state, action) {
      state.status = "pending";
      state.suspender = action.payload;
    },
    loadFailed(state, action) {
      state.status = "error";
      state.results = action.payload;
      state.suspender = null;
    },
    loadResults(state, action) {
      state.status = "success";
      state.results = action.payload;
      state.suspender = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  newSearch,
  gotoPage,
  setRankingProfile,
  startLoad,
  loadFailed,
  loadResults,
} = searchSlice.actions;

export default searchSlice.reducer;
