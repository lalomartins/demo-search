import { useContext } from "react";
import { Pagination } from "antd";

import "./search.css";
import { SearchLogic, SearchResultsContext } from "../logic/search";
import { SearchBox } from "../common/search/SearchBox";
import { SearchTools } from "../common/search/SearchTools";

export function SearchPage() {
  useContext(SearchResultsContext);

  return (
    <SearchLogic>
      <SearchResultsContext.Consumer>
        {
          // this is temporary while I extract the components
          (results) => (
            <>
              <SearchBox />
              <SearchTools />
              <div id="search-results">
                <p id="search-results-metadata" className="metadata">
                  {results.query.searchinfo.totalhits} total results
                </p>
                <div id="search-results-list">
                  {results.query.search.map((result) => (
                    <div className="search-result-item" key={result.pageid}>
                      <a
                        className="search-result-title"
                        href={results.pageLink(result)}
                      >
                        {result.title}
                      </a>
                      <p className="metadata">
                        Last updated {result.timestamp}; contains{" "}
                        {result.wordcount} words
                      </p>
                      <div
                        className="search-result-snippet"
                        dangerouslySetInnerHTML={{ __html: result.snippet }}
                      />
                    </div>
                  ))}
                </div>
                <Pagination
                  id="search-results-pagination"
                  hideOnSinglePage
                  showSizeChanger={false}
                  defaultCurrent={1}
                  total={results.query.searchinfo.totalhits}
                />
              </div>
            </>
          )
        }
      </SearchResultsContext.Consumer>
    </SearchLogic>
  );
}
