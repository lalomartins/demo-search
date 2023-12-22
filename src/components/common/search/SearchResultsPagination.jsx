import { useContext } from "react";
import { Pagination } from "antd";

import { SearchResultsContext } from "../../logic/search";

export function SearchResultsPagination() {
  const results = useContext(SearchResultsContext);

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
