import { useContext } from "react";
import { Input } from "antd";

import { SearchContext } from "../../logic/search";

const onSearch = (value, _e, info) => console.log(info?.source, value);

export function SearchBox() {
  const search = useContext(SearchContext);

  return (
    <div id="search-box">
      <Input.Search
        placeholder="input search text"
        allowClear
        value={search.searchstring}
        onSearch={onSearch}
      />
    </div>
  );
}
