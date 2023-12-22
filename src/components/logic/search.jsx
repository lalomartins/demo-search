import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  constructor(searchString, page, ranking) {
    this.searchString = searchString;
    this.options = {
      srqiprofile: ranking,
    };
    this.page = page;
    this._suspense = {
      status: "pending",
      suspender: null,
    };
  }

  // integrate with Suspense
  results() {
    switch (this._suspense.status) {
      case "pending":
        throw this._suspense.suspender;

      case "error":
        throw this._suspense.results;

      default:
        return this._suspense.results;
    }
  }

  get ready() {
    return this._suspense.status === "success";
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
    this._suspense = {
      status: "pending",
      suspender: fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.error != null) {
            this._suspense = {
              status: "error",
              results: response.error,
            };
          } else {
            this._suspense = {
              status: "success",
              results: {
                ...response,
                query: {
                  ...response.query,
                  search: response.query.search.map(
                    (item) => new SearchResultPage(item)
                  ),
                },
              },
            };
          }
        })
        .catch((error) => {
          console.log(error);
          this._suspense = {
            status: "error",
            results: error,
          };
        }),
    };
    return this;
  }
}

export const SearchContext = createContext(null);

export function useSearchResults() {
  const search = useContext(SearchContext);
  return search.results();
}

export function SearchLogic({ children }) {
  const location = useLocation();
  const [searchString, setSearchString] = useState(location.state?.q);
  const [page, setPage] = useState(1);
  const [ranking, setRanking] = useState("engine_autoselect");
  const navigate = useNavigate();
  const search = useMemo(
    () => new SearchOperation(searchString, page, ranking)._fetch(),
    [page, ranking, searchString]
  );
  useEffect(() => {
    if (searchString == null || searchString?.length === 0) {
      navigate("/", { replace: true });
    }
  }, [navigate, searchString]);
  search.setSearchString = setSearchString;
  search.setPage = setPage;
  search.setRanking = setRanking;

  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
}
