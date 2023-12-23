import { createContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  SearchStatus,
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
            this._dispatch(loadFailed(error));
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
    case SearchStatus.PENDING:
      throw searchSlice.suspender;

    case SearchStatus.ERROR:
      throw searchSlice.results;

    default:
      return searchSlice.results;
  }
}

export function SearchLogic({ children }) {
  const dispatch = useDispatch();

  const searchSlice = useSelector((state) => state.search);
  const navigate = useNavigate();
  const search = useMemo(
    () =>
      new SearchOperation(
        searchSlice.searchString,
        searchSlice.page,
        searchSlice.ranking,
        dispatch
      )._fetch(),
    [searchSlice.page, searchSlice.ranking, searchSlice.searchString]
  );
  useEffect(() => {
    if (
      searchSlice.searchString == null ||
      searchSlice.searchString?.length === 0
    ) {
      navigate("/", { replace: true });
    }
  }, [navigate, searchSlice.searchString]);

  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
}
