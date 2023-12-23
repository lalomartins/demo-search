import { Suspense } from "react";
import SlSpinner from "@shoelace-style/shoelace/dist/react/spinner";

import "./SearchResultsMetadata";
import "./SearchResultsPagination";
import "./SearchResultItem";

export function SearchResultsContainer() {
  return (
    <div id="search-results">
      <Suspense fallback={<SlSpinner style={{ fontSize: "3rem" }} />}>
        <search-results-metadata />
        <search-results-list />
        <search-results-pagination />
      </Suspense>
    </div>
  );
}
