import { useContext } from "react";
import SlRadioButton from "@shoelace-style/shoelace/dist/react/radio-button";
import SlRadioGroup from "@shoelace-style/shoelace/dist/react/radio-group";

import { SearchContext } from "../../logic/search";
import { Router } from "@capitec/omni-router";

export function SearchTools() {
  const search = useContext(SearchContext);
  const location = Router.currentLocation;
  function onChange(e) {
    const newParams = new URLSearchParams(
      Array.from(Object.entries(location.queryParams))
    );
    newParams.set("r", e.target.value);
    newParams.set("page", 1);
    Router.push(`/search?${newParams}`);
  }

  return (
    <div id="search-tools">
      <SlRadioGroup
        name="r"
        size="small"
        value={search.options.srqiprofile}
        onSlChange={onChange}
      >
        <SlRadioButton value="engine_autoselect">Default ranking</SlRadioButton>
        <SlRadioButton value="popular_inclinks_pv">
          Popular (views)
        </SlRadioButton>
        <SlRadioButton value="popular_inclinks">Links</SlRadioButton>
      </SlRadioGroup>
    </div>
  );
}
