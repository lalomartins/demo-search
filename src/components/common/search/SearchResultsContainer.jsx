import { Spin } from "antd";

import { SearchResultsMetadata } from "./SearchResultsMetadata";
import { SearchResultsPagination } from "./SearchResultsPagination";
import { SearchResultsList } from "./SearchResultItem";
import { Suspense } from "react";

export function SearchResultsContainer() {
  return (
    <div id="search-results">
      <Suspense fallback={<Spin size="large" />}>
        <SearchResultsMetadata />
        <SearchResultsList />
        <SearchResultsPagination />
      </Suspense>
    </div>
  );
}
