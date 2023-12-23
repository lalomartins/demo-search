import "./search.css";
import { useSearchOperation } from "../../services/search";
import { SearchBox } from "../common/search/SearchBox";
import { SearchResultsContainer } from "../common/search/SearchResultsContainer";
import { SearchTools } from "../common/search/SearchTools";

export function SearchPage() {
  useSearchOperation();
  return (
    <>
      <SearchBox />
      <SearchTools />
      <SearchResultsContainer />
    </>
  );
}
