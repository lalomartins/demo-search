import { useContext } from "react";
import { SearchResultsContext } from "../../logic/search";
import { SearchResultsMetadata } from "./SearchResultsMetadata";
import { SearchResultsPagination } from "./SearchResultsPagination";

export function SearchResultsContainer({ result }) {
  const results = useContext(SearchResultsContext);

  return (
    <div id="search-results">
      <SearchResultsMetadata />
      <div id="search-results-list">
        {results.query.search.map((result) => (
          <div className="search-result-item" key={result.pageid}>
            <a className="search-result-title" href={results.pageLink(result)}>
              {result.title}
            </a>
            <p className="metadata">
              Last updated {result.timestamp}; contains {result.wordcount} words
            </p>
            <div
              className="search-result-snippet"
              dangerouslySetInnerHTML={{
                __html: result.snippet,
              }}
            />
          </div>
        ))}
      </div>
      <SearchResultsPagination />
    </div>
  );
}
