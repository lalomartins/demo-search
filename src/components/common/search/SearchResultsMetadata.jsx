import { useContext } from "react";

import { SearchResultsContext } from "../../logic/search";

export function SearchResultsMetadata() {
  const results = useContext(SearchResultsContext);
  return (
    <p id="search-results-metadata" className="metadata">
      {results.query.searchinfo.totalhits} total results
    </p>
  );
}
