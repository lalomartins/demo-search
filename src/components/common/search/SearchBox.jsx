import { useContext } from "react";
import { Input } from "antd";

import { SearchContext } from "../../logic/search";
import { useSearchParams } from "react-router-dom";

export function SearchBox() {
  const search = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  function onSearch(value, _e, info) {
    const newParams = new URLSearchParams([
      ...Array.from(searchParams.entries()),
      ["s", "value"],
    ]);
    newParams.set("q", value);
    setSearchParams(newParams);
  }

  return (
    <div id="search-box">
      <Input.Search
        placeholder="input search text"
        allowClear
        defaultValue={search.searchstring}
        onSearch={onSearch}
      />
    </div>
  );
}
