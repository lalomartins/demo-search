import { Suspense } from "react";

import "./search.css";
import { SearchLogic } from "../logic/search";
import { SearchBox } from "../common/search/SearchBox";
import { SearchResultsContainer } from "../common/search/SearchResultsContainer";
import { SearchTools } from "../common/search/SearchTools";

export function SearchPage() {
  return (
    <Suspense>
      <SearchLogic>
        <SearchBox />
        <SearchTools />
        <SearchResultsContainer />
      </SearchLogic>
    </Suspense>
  );
}
