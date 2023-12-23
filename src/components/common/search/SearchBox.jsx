import { Input } from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newSearch } from "../../../state/search";

export function SearchBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchString = useSelector((state) => state.search.searchString);
  function onSearch(value, _e, _info) {
    dispatch(newSearch(value));
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  }

  return (
    <div id="search-box">
      <Input.Search
        placeholder="input search text"
        allowClear
        defaultValue={searchString}
        onSearch={onSearch}
      />
    </div>
  );
}
