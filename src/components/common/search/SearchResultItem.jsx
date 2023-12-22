import { useContext } from "react";

import { SearchOperation, SearchContext } from "../../logic/search";

export function SearchResultItem({ result }) {
  return (
    <div className="search-result-item" key={result.pageid}>
      <a
        className="search-result-title"
        href={SearchOperation.pageLink(result)}
      >
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
  const results = useContext(SearchContext).results();

  return (
    <div id="search-results-list">
      {results?.query.search.map((result) => (
        <SearchResultItem key={result.pageid} result={result} />
      ))}
    </div>
  );
}
