import { Pagination } from "antd";

import { useSearchResults } from "../../../services/search";
import { useDispatch, useSelector } from "react-redux";
import { gotoPage } from "../../../state/search";

export function SearchResultsPagination() {
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const results = useSearchResults();
  function onChange(value) {
    dispatch(gotoPage(value));
  }
  // Wikipedia API only returns up to 10000 results
  const total = Math.min(results.query.searchinfo.totalhits, 10000);

  return (
    <Pagination
      id="search-results-pagination"
      hideOnSinglePage
      pageSize={search.pageSize}
      showSizeChanger={false}
      current={search.page}
      total={total}
      onChange={onChange}
    />
  );
}
