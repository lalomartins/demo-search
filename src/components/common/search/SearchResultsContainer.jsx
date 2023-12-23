import { Suspense } from "react";
import SlSpinner from "@shoelace-style/shoelace/dist/react/spinner";

import { SearchResultsMetadata } from "./SearchResultsMetadata";
import { SearchResultsPaginationTemp } from "./SearchResultsPagination";
import { SearchResultsList } from "./SearchResultItem";

export function SearchResultsContainer() {
  return (
    <div id="search-results">
      <Suspense fallback={<SlSpinner style={{ fontSize: "3rem" }} />}>
        <SearchResultsMetadata />
        <search-results-list />
        <search-results-pagination />
      </Suspense>
    </div>
  );
}
