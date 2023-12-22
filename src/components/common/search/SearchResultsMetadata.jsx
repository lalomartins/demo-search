import { useContext } from "react";

import { SearchContext } from "../../logic/search";

export function SearchResultsMetadata() {
  const results = useContext(SearchContext).results();
  return (
    <p id="search-results-metadata" className="metadata">
      {results?.query.searchinfo.totalhits} total results
    </p>
  );
}
