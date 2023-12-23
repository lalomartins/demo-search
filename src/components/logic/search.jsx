import { createContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  newSearch,
  gotoPage,
  setRankingProfile,
  startLoad,
  loadFailed,
  loadResults,
} from "../../state/search";

const url = "https://en.wikipedia.org/w/api.php";

class SearchResultPage {
  constructor(data) {
    Object.assign(this, data);
  }

  link() {
    return `http://en.wikipedia.org/?curid=${this.pageid}`;
  }
}

export class SearchOperation {
  static PAGE_LEN = 10;

  constructor(searchString, page, ranking, dispatch) {
    this.searchString = searchString;
    this.options = {
      srqiprofile: ranking,
    };
    this.page = page;
    this._dispatch = dispatch;
  }

  _fetch() {
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: this.searchString,
      format: "json",
      srqiprofile: this.options.srqiprofile,
      sroffset: (this.page - 1) * this.constructor.PAGE_LEN,
      origin: "*",
    });
    this._dispatch(
      startLoad(
        fetch(`${url}?${params}`)
          .then((response) => response.json())
          .then((response) => {
            if (response.error != null) {
              this._dispatch(loadFailed(response.error));
            } else {
              this._dispatch(
                loadResults({
                  ...response,
                  query: {
                    ...response.query,
                    search: response.query.search.map(
                      (item) => new SearchResultPage(item)
                    ),
                  },
                })
              );
            }
          })
          .catch((error) => {
            console.log(error);
            this._suspense = {
              status: "error",
              results: error,
            };
          })
      )
    );
    return this;
  }
}

export const SearchContext = createContext(null);

export function useSearchResults() {
  const searchSlice = useSelector((state) => state.search);
  switch (searchSlice.status) {
    case "pending":
      throw searchSlice.suspender;

    case "error":
      throw searchSlice.results;

    default:
      return searchSlice.results;
  }
}

export function SearchLogic({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchSlice = useSelector((state) => state.search);
  let { searchString, page } = searchSlice;
  // if (searchSlice.searchString === "empty") {
  // TODO this is temporary until I port the search box
  if (searchSlice.searchString.length === 0) {
    searchString = location.state.q;
    page = 1;
    dispatch(newSearch(searchString));
  }
  const navigate = useNavigate();
  const search = useMemo(
    () =>
      new SearchOperation(
        searchString,
        page,
        searchSlice.ranking,
        dispatch
      )._fetch(),
    [page, searchSlice.ranking, searchString]
  );
  useEffect(() => {
    if (searchString == null || searchString?.length === 0) {
      navigate("/", { replace: true });
    }
  }, [navigate, searchString]);
  search.setSearchString = (s) => dispatch(newSearch(s));
  search.setPage = (page) => dispatch(gotoPage(page));
  search.setRanking = (ranking) => dispatch(setRankingProfile(ranking));

  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
}
