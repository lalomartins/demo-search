import { createSlice } from "@reduxjs/toolkit";

export const SearchStatus = Object.freeze({
  EMPTY: "empty",
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
});

const initialState = {
  status: SearchStatus.EMPTY,
  searchString: "",
  page: 1,
  pageSize: 10,
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
    clearSearch(state) {
      state.searchString = "";
      state.status = SearchStatus.EMPTY;
    },
    gotoPage(state, action) {
      state.page = action.payload;
    },
    setRankingProfile(state, action) {
      state.ranking = action.payload;
      state.page = 1;
    },
    startLoad(state, action) {
      state.status = SearchStatus.PENDING;
      state.suspender = action.payload;
    },
    loadFailed(state, action) {
      state.status = SearchStatus.ERROR;
      state.results = action.payload;
      state.suspender = null;
    },
    loadResults(state, action) {
      state.status = SearchStatus.SUCCESS;
      state.results = action.payload;
      state.suspender = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  newSearch,
  clearSearch,
  gotoPage,
  setRankingProfile,
  startLoad,
  loadFailed,
  loadResults,
} = searchSlice.actions;

export default searchSlice.reducer;
