import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const url = "https://en.wikipedia.org/w/api.php";

// Copied from https://www.mediawiki.org/wiki/API:Search with adaptations
const dummyData = {
  batchcomplete: "",
  continue: {
    sroffset: 10,
    continue: "-||",
  },
  query: {
    searchinfo: {
      totalhits: 0,
    },
    search: [],
  },
};

export class SearchResults {
  constructor(apiData, params) {
    Object.assign(this, apiData);
    this.searchstring = params.get("srsearch");
    this.options = {
      srqiprofile: params.get("srqiprofile"),
    };
  }

  pageLink(result) {
    return `http://en.wikipedia.org/?curid=${result.pageid}`;
  }
}

export const SearchResultsContext = createContext(null);

export function SearchLogic({ children }) {
  let [searchParams, _setSearchParams] = useSearchParams();
  const [results, setResults] = useState(
    new SearchResults(dummyData, searchParams)
  );
  useEffect(() => {
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: searchParams.get("q"),
      format: "json",
      srqiprofile: "engine_autoselect",
      origin: "*",
    });
    fetch(`${url}?${params}`)
      .then((response) => response.json())
      .then((response) => setResults(new SearchResults(response, params)))
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);

  return (
    <SearchResultsContext.Provider value={results}>
      {children}
    </SearchResultsContext.Provider>
  );
}
