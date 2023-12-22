import { useContext } from "react";
import { Input, Pagination, Radio, Space } from "antd";

import "./search.css";
import { SearchLogic, SearchResultsContext } from "../logic/search";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

export function SearchPage() {
  return (
    <SearchLogic>
      <SearchResultsContext.Consumer>
        {
          // this is temporary while I extract the components
          (results) => (
            <>
              <div id="search-box">
                <Search
                  placeholder="input search text"
                  allowClear
                  value={results.searchstring}
                  onSearch={onSearch}
                />
              </div>
              <div id="search-tools">
                <Space>
                  <Radio.Group
                    name="srwhat"
                    size="small"
                    defaultValue="nearmatch"
                  >
                    <Radio.Button value="nearmatch">Standard</Radio.Button>
                    <Radio.Button value="text">Exact</Radio.Button>
                    <Radio.Button value="title">Titles</Radio.Button>
                  </Radio.Group>
                  <Radio.Group
                    name="srprofile"
                    size="small"
                    defaultValue="classic"
                  >
                    <Radio.Button value="classic">Default ranking</Radio.Button>
                    <Radio.Button value="popular_inclinks_pv">
                      Popular (views)
                    </Radio.Button>
                    <Radio.Button value="popular_inclinks">Links</Radio.Button>
                  </Radio.Group>
                </Space>
              </div>
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

// const results = useContext(SearchResultsContext);
