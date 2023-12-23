import SlSpinner from "@shoelace-style/shoelace/dist/react/spinner";

import { SearchResultsMetadata } from "./SearchResultsMetadata";
import { SearchResultsPagination } from "./SearchResultsPagination";
import { SearchResultsList } from "./SearchResultItem";
import { Suspense } from "react";

export function SearchResultsContainer() {
  return (
    <div id="search-results">
      <Suspense fallback={<SlSpinner style={{ fontSize: "3rem" }} />}>
        <SearchResultsMetadata />
        <SearchResultsList />
        <SearchResultsPagination />
      </Suspense>
    </div>
  );
}
