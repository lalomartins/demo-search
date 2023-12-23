/* eslint-disable max-classes-per-file */
import { html } from "lit";
import { createContext, ContextProvider, ContextConsumer } from "@lit/context";
import { Router } from "@capitec/omni-router";

import { RouteAwareElement } from "../../lib/RouteAwareElement.js";

const url = "https://en.wikipedia.org/w/api.php";

export function searchResultPageLink() {
  return `http://en.wikipedia.org/?curid=${this.pageid}`;
}

export class SearchOperation {
  static PAGE_LEN = 10;

  constructor(params, controller) {
    this.searchstring = params.q;
    this.options = {
      srqiprofile: params.r ?? "engine_autoselect",
    };
    this.page = params.page ?? 1;
    this._controller = controller;
    this._suspense = {
      status: "pending",
      suspender: null,
    };
  }

  // integrate with Suspense
  results() {
    switch (this._suspense.status) {
      case "pending":
        throw this._suspense.suspender;

      case "error":
        throw this._suspense.results;

      default:
        return this._suspense.results;
    }
  }

  get ready() {
    return this._suspense.status === "success";
  }

  _fetch() {
    this._suspense = {
      status: "pending",
      suspender: this._fetchInner(),
    };
  }

  async _fetchInner() {
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: this.searchstring,
      format: "json",
      srqiprofile: this.options.srqiprofile,
      sroffset: (this.page - 1) * this.constructor.PAGE_LEN,
      origin: "*",
    });
    try {
      const json = await fetch(`${url}?${params}`);
      const response = await json.json();
      if (response.error != null) {
        this._suspense = {
          status: "error",
          results: response.error,
        };
        this._controller.setValue(this._suspense);
      } else {
        this._suspense = {
          status: "success",
          results: response,
        };
        this._controller.setValue(this._suspense);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      this._suspense = {
        status: "error",
        results: error,
      };
      this._controller.setValue(this._suspense);
    }
  }
}

export const searchContext = createContext(Symbol("search"));
export const searchResultsContext = createContext(Symbol("search-results"));

const dummyData = {
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

export function useSearchResults() {
  return dummyData;
}

export class SearchProvider extends RouteAwareElement {
  _searchProvider = new ContextProvider(this, { context: searchContext });

  _searchResultsProvider = new ContextProvider(this, {
    context: searchResultsContext,
  });

  constructor() {
    super();
    this._createSearch(Router.currentLocation);
  }

  locationChanged({ current }) {
    this._createSearch(current);
  }

  _createSearch(location) {
    const { q } = location.queryParams;
    if (q == null || q?.length === 0) {
      Router.replace("/");
    } else {
      const search = new SearchOperation(
        location.queryParams,
        this._searchResultsProvider
      );
      search._fetch();
      this._searchProvider.setValue(search);
    }
  }

  render() {
    return html` <slot></slot> `;
  }
}
window.customElements.define("search-provider", SearchProvider);

export const SearchResultsConsumer = superClass =>
  // eslint-disable-next-line no-shadow
  class SearchResultsConsumer extends superClass {
    static properties = {
      searchResults: { state: true },
      searchStatus: { state: true },
    };

    constructor() {
      super();
      this.searchResults = {};
      this._controller = new ContextConsumer(this, {
        context: searchResultsContext,
        subscribe: true,
        callback: value => {
          this._results = value;
          this.searchResults = value?.results;
          this.searchStatus = value?.status;
        },
      });
    }
  };
