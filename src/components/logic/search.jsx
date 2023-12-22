import { createContext, useState } from "react";

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

export class SearchResults {
  constructor() {
    Object.assign(this, dummyData);
  }

  pageLink(result) {
    return `http://en.wikipedia.org/?curid=${result.pageid}`;
  }

  static makeDummy() {
    return new SearchResults();
  }
}

export const SearchResultsContext = createContext(null);

export function SearchLogic({ children }) {
  const [results, _setResults] = useState(SearchResults.makeDummy);
  return (
    <SearchResultsContext.Provider value={results}>
      {children}
    </SearchResultsContext.Provider>
  );
}
