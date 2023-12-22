import { Pagination } from "antd";

import { SearchContext } from "../../logic/search";
import { useContext } from "react";

export function SearchResultsPagination() {
  const search = useContext(SearchContext);
  const results = search.results();
  function onChange(value) {
    search.setPage(value);
  }
  // Wikipedia API only returns up to 10000 results
  const total = Math.min(results.query.searchinfo.totalhits, 10000);

  return (
    <Pagination
      id="search-results-pagination"
      hideOnSinglePage
      pageSize={search.constructor.PAGE_LEN}
      showSizeChanger={false}
      current={search.page}
      total={total}
      onChange={onChange}
    />
  );
}
