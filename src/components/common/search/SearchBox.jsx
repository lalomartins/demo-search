import { useContext } from "react";
import SlInput from "@shoelace-style/shoelace/dist/react/input";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon";
import SlDivider from "@shoelace-style/shoelace/dist/react/divider";

import { SearchContext } from "../../logic/search";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SearchBox() {
  const search = useContext(SearchContext);
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  function onChange(event) {
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
        onSlChange={onChange}
      >
        <SlDivider vertical slot="suffix" />
        <SlIcon name="search" slot="suffix" />
      </SlInput>
    </div>
  );
}
