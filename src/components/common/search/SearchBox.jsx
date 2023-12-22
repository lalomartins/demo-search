import { useContext } from "react";
import { Input } from "antd";

import { SearchResultsContext } from "../../logic/search";

const onSearch = (value, _e, info) => console.log(info?.source, value);

export default function SearchBox() {
  const results = useContext(SearchResultsContext);

  return (
    <div id="search-box">
      <Input.Search
        placeholder="input search text"
        allowClear
        value={results.searchstring}
        onSearch={onSearch}
      />
    </div>
  );
}
