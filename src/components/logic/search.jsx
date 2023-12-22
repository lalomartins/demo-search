import { createContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const url = "https://en.wikipedia.org/w/api.php";

export class SearchOperation {
  constructor(params, suspense) {
    this.searchstring = params.get("q");
    this.options = {
      srqiprofile: params.get("srqiprofile"),
    };
    this._suspense = suspense ?? {
      status: "static",
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

  _fetch() {
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: this.searchstring,
      format: "json",
      srqiprofile: "engine_autoselect",
      origin: "*",
    });
    this._suspense = {
      status: "pending",
      suspender: fetch(`${url}?${params}`)
        .then((response) => response.json())
        .then(
          (response) =>
            new Promise((resolve, _reject) =>
              setTimeout(() => {
                this._suspense = {
                  status: "success",
                  results: response,
                };
                resolve();
              }, 10000)
            )
        )
        .catch((error) => {
          console.log(error);
          this._suspense = {
            status: "error",
            results: error,
          };
        }),
    };
  }

  static pageLink(result) {
    return `http://en.wikipedia.org/?curid=${result.pageid}`;
  }
}

export const SearchContext = createContext(null);

export function SearchLogic({ children }) {
  let [searchParams, _setSearchParams] = useSearchParams();
  const search = useMemo(
    () => new SearchOperation(searchParams),
    [searchParams]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => search._fetch(), [searchParams]);

  return (
    <SearchContext.Provider value={search}>{children}</SearchContext.Provider>
  );
}
