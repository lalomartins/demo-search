import { Input, Pagination, Radio, Space } from "antd";

import "./search.css";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const pageLink = (result) => `http://en.wikipedia.org/?curid=${result.pageid}`;

// Copied from https://www.mediawiki.org/wiki/API:Search with adaptations
const dummyData = {
  searchstring: "Nelson Mandela",
  batchcomplete: "",
  continue: {
    sroffset: 10,
    continue: "-||",
  },
  query: {
    searchinfo: {
      totalhits: 5060,
    },
    search: [
      {
        ns: 0,
        title: "Nelson Mandela",
        pageid: 21492751,
        size: 196026,
        wordcount: 23664,
        snippet:
          '<span class="searchmatch">Nelson</span> Rolihlahla <span class="searchmatch">Mandela</span> (/mænˈdɛlə/, Xhosa: [xoliɬaˈɬa <span class="searchmatch">manˈdɛla</span>]; 18 July 1918 – 5 December 2013) was a South African anti-apartheid revolutionary,',
        timestamp: "2018-07-23T07:59:43Z",
      },
      {
        ns: 0,
        title: "Death of Nelson Mandela",
        pageid: 41284488,
        size: 133513,
        wordcount: 13512,
        snippet:
          'On December 5, 2013, <span class="searchmatch">Nelson</span> <span class="searchmatch">Mandela</span>, the first President of South Africa to be elected in a fully representative democratic election, as well as the country\'s',
        timestamp: "2018-07-19T17:30:59Z",
      },
    ],
  },
};

export function SearchPage() {
  const results = dummyData;
  return (
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
      <div id="search-results">
        <p id="search-results-metadata" className="metadata">
          {results.query.searchinfo.totalhits} total results
        </p>
        <div id="search-results-list">
          {results.query.search.map((result) => (
            <div className="search-result-item" key={result.pageid}>
              <a className="search-result-title" href={pageLink(result)}>
                {result.title}
              </a>
              <p className="metadata">
                Last updated {result.timestamp}; contains {result.wordcount}{" "}
                words
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
  );
}
