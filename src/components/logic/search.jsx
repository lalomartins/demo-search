import { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const url = "https://en.wikipedia.org/w/api.php";

export function searchResultPageLink() {
  return `http://en.wikipedia.org/?curid=${this.pageid}`;
}

export class SearchOperation {
  static PAGE_LEN = 10;

  constructor(params, suspense) {
    this.searchstring = params.get("q");
    this.options = {
      srqiprofile: params.get("r") ?? "engine_autoselect",
    };
    this.page = params.get("page") ?? 1;
    this._suspense = suspense ?? {
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
      srsearch: this.searchstring,
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
              results: response,
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
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = useMemo(
    () => new SearchOperation(searchParams)._fetch(),
    [searchParams]
  );
  useEffect(() => {
    const q = searchParams.get("q");
    if (q == null || q?.length === 0) {
      navigate("/", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
}
