import { SearchResultsMetadata } from "./SearchResultsMetadata";
import { SearchResultsPagination } from "./SearchResultsPagination";
import { SearchResultsList } from "./SearchResultItem";

export function SearchResultsContainer() {
  return (
    <div id="search-results">
      <SearchResultsMetadata />
      <SearchResultsList />
      <SearchResultsPagination />
    </div>
  );
}
