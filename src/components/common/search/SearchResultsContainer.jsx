import { Suspense } from "react";

import { SearchResultsMetadata } from "./SearchResultsMetadata";
import { SearchResultsPagination } from "./SearchResultsPagination";
import { SearchResultsList } from "./SearchResultItem";

export function SearchResultsContainer() {
  return (
    <div id="search-results">
      <Suspense fallback={<p>loading…</p>}>
        <SearchResultsMetadata />
        <SearchResultsList />
        <SearchResultsPagination />
      </Suspense>
    </div>
  );
}
