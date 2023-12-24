import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  SearchStatus,
  startLoad,
  loadFailed,
  loadResults,
} from "../state/search";

const url = "https://en.wikipedia.org/w/api.php";

export function searchResultPageLink(page) {
  return `http://en.wikipedia.org/?curid=${page.pageid}`;
}

const promises = new Map();

/// Wrap getting the results from the Redux store to support Suspense
export function useSearchResults() {
  const searchSlice = useSelector((state) => state.search);
  switch (searchSlice.status) {
    case SearchStatus.EMPTY:
      // Give Suspense a never-fulfilling promise so we get a spinner
      // while we navigate back to home
      throw new Promise(() => {});

    case SearchStatus.PENDING:
      throw promises.get(searchSlice.suspender);

    case SearchStatus.ERROR:
      throw searchSlice.results;

    default:
      return searchSlice.results;
  }
}

/// Perform search and put results in the store
export function useSearchOperation() {
  const dispatch = useDispatch();
  const searchSlice = useSelector((state) => state.search);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      searchSlice.searchString == null ||
      searchSlice.searchString?.length === 0
    ) {
      navigate("/", { replace: true });
    }
  }, [navigate, searchSlice.searchString]);
  useEffect(() => {
    if (
      searchSlice.searchString == null ||
      searchSlice.searchString?.length === 0
    )
      return;
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: searchSlice.searchString,
      format: "json",
      srqiprofile: searchSlice.ranking,
      sroffset: (searchSlice.page - 1) * searchSlice.pageSize,
      origin: "*",
    });
    const suspender = Date.now();
    promises.set(
      suspender,
      fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.error != null) {
            dispatch(loadFailed(response.error));
          } else {
            dispatch(loadResults(response));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(loadFailed(error));
        })
        .finally(() => {
          promises.delete(suspender);
        })
    );
    dispatch(startLoad(suspender));
  }, [
    // dispatch is stable, but we include it here anyway to make the linter happier
    // https://react-redux.js.org/api/hooks#usedispatch
    dispatch,
    searchSlice.page,
    searchSlice.pageSize,
    searchSlice.ranking,
    searchSlice.searchString,
  ]);
}
