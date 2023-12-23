import "./home.css";
import { SearchBox } from "../common/search/SearchBox";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearSearch } from "../../state/search";

export function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearSearch());
  }, [dispatch]);
  return (
    <div id="home-search-box">
      <SearchBox />
    </div>
  );
}
