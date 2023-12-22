import { useContext } from "react";
import { Input } from "antd";

import { SearchContext } from "../../logic/search";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SearchBox() {
  const search = useContext(SearchContext);
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  function onSearch(value, _e, info) {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set("q", value);
    navigate(`/search?${newParams}`);
  }

  return (
    <div id="search-box">
      <Input.Search
        placeholder="input search text"
        allowClear
        defaultValue={search?.searchstring}
        onSearch={onSearch}
      />
    </div>
  );
}
