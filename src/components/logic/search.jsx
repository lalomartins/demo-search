import { createContext, useContext, useEffect, useMemo } from "react";
import { Router } from "@capitec/omni-router";

const url = "https://en.wikipedia.org/w/api.php";

export function searchResultPageLink() {
  return `http://en.wikipedia.org/?curid=${this.pageid}`;
}

export class SearchOperation {
  static PAGE_LEN = 10;

  constructor(params, suspense) {
    this.searchstring = params.q;
    this.options = {
      srqiprofile: params.r ?? "engine_autoselect",
    };
    this.page = params.page ?? 1;
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
  const location = Router.currentLocation;
  const search = useMemo(
    () => new SearchOperation(location.queryParams)._fetch(),
    [location.queryParams]
  );
  useEffect(() => {
    const q = location.queryParams.q;
    if (q == null || q?.length === 0) {
      Router.replace("/");
    }
  }, [location.queryParams]);

  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
}
