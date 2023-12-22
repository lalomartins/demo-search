import { useContext } from "react";

import { SearchResultsContext } from "../../logic/search";

export function SearchResultItem({ result }) {
  // FIXME
  const results = useContext(SearchResultsContext);

  return (
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
  );
}
export function SearchResultsList({ result }) {
  const results = useContext(SearchResultsContext);

  return (
    <div id="search-results-list">
      {results.query.search.map((result) => (
        <SearchResultItem key={result.pageid} result={result} />
      ))}
    </div>
  );
}
