import { useSearchResults } from "../../logic/search";

export function SearchResultsMetadata() {
  const results = useSearchResults();

  return (
    <p id="search-results-metadata" className="metadata">
      {results.query.searchinfo.totalhits} total results
    </p>
  );
}
