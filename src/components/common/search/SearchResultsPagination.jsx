import { useContext } from "react";
import { Pagination } from "antd";

import { SearchContext } from "../../logic/search";

export function SearchResultsPagination() {
  const results = useContext(SearchContext).results();

  return (
    <Pagination
      id="search-results-pagination"
      hideOnSinglePage
      showSizeChanger={false}
      defaultCurrent={1}
      total={results?.query.searchinfo?.totalhits ?? 0}
    />
  );
}
