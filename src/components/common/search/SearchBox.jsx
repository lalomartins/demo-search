import { useContext } from "react";
import SlInput from "@shoelace-style/shoelace/dist/react/input";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon";

import { SearchContext } from "../../logic/search";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SearchBox() {
  const search = useContext(SearchContext);
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  function onSearch(event) {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));
    newParams.set("q", event.target.value);
    newParams.set("page", 1);
    navigate(`/search?${newParams}`);
  }

  return (
    <div id="search-box">
      <SlInput
        type="search"
        placeholder="input search text"
        clearable
        value={search?.searchstring}
        onSlChange={onSearch}
      >
        <SlIcon name="search" slot="suffix" />
      </SlInput>
    </div>
  );
}
