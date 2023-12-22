import { Pagination } from "antd";

import { useSearchResults } from "../../logic/search";

export function SearchResultsPagination() {
  const results = useSearchResults();

  return (
    <Pagination
      id="search-results-pagination"
      hideOnSinglePage
      showSizeChanger={false}
      defaultCurrent={1}
      total={results.query.searchinfo.totalhits}
    />
  );
}
