import { Pagination, Radio, Space } from "antd";

import "./search.css";
import { SearchLogic, SearchResultsContext } from "../logic/search";
import SearchBox from "../common/search/SearchBox";

export function SearchPage() {
  return (
    <SearchLogic>
      <SearchResultsContext.Consumer>
        {
          // this is temporary while I extract the components
          (results) => (
            <>
              <SearchBox />
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

function undefined({}) {
  return (
    <div id="search-tools">
      <Space>
        <Radio.Group name="srwhat" size="small" defaultValue="nearmatch">
          <Radio.Button value="nearmatch">Standard</Radio.Button>
          <Radio.Button value="text">Exact</Radio.Button>
          <Radio.Button value="title">Titles</Radio.Button>
        </Radio.Group>
        <Radio.Group name="srprofile" size="small" defaultValue="classic">
          <Radio.Button value="classic">Default ranking</Radio.Button>
          <Radio.Button value="popular_inclinks_pv">
            Popular (views)
          </Radio.Button>
          <Radio.Button value="popular_inclinks">Links</Radio.Button>
        </Radio.Group>
      </Space>
    </div>
  );
}
