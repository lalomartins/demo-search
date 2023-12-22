import { useContext } from "react";
import { Input } from "antd";

import { SearchContext } from "../../logic/search";
import { useNavigate } from "react-router-dom";

export function SearchBox() {
  const search = useContext(SearchContext);
  const navigate = useNavigate();
  function onSearch(value, _e, _info) {
    if (search == null) {
      navigate("/search", { state: { q: value } });
    } else {
      search.setSearchString(value);
    }
  }

  return (
    <div id="search-box">
      <Input.Search
        placeholder="input search text"
        allowClear
        defaultValue={search?.searchString}
        onSearch={onSearch}
      />
    </div>
  );
}
