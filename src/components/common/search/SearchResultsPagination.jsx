import { Pagination } from "antd";

import { SearchContext } from "../../logic/search";
import { useContext } from "react";
import { Router } from "@capitec/omni-router";

export function SearchResultsPagination() {
  const search = useContext(SearchContext);
  const results = search.results();
  const location = Router.currentLocation;
  function onChange(value) {
    const newParams = new URLSearchParams(
      Array.from(Object.entries(location.queryParams))
    );
    newParams.set("page", value);
    Router.push(`/search?${newParams}`);
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
