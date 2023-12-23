import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@capitec/omni-router";

import { RouteAwareElement } from "../../../lib/RouteAwareElement";
import "../Pagination";

import { SearchOperation, useSearchResults } from "../../logic/search";

export function SearchResultsPaginationTemp() {
  const results = useSearchResults();

  return (
    <search-results-pagination total={results.query.searchinfo.totalhits} />
  );
}

@customElement("search-results-pagination")
export class SearchResultsPagination extends RouteAwareElement {
  static properties = {
    total: { type: Number },
    _value: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      margin-top: 3pt;
    }
  `;

  constructor() {
    super();
    const location = Router.currentLocation;
    this._value = location.queryParams.page ?? 1;
  }

  locationChanged({ current }) {
    this._value = current.queryParams.page ?? 1;
  }

  _onChange(event) {
    const newParams = new URLSearchParams(
      Array.from(Object.entries(Router.currentLocation.queryParams))
    );
    newParams.set("page", event.detail.page);
    Router.push(`/search?${newParams}`);
  }

  render() {
    // Wikipedia API only returns up to 10000 results
    const total = Math.min(this.total, 10000);

    return html`
      <shoestring-pagination
        id="search-results-pagination"
        hide-on-single-page
        page-size=${SearchOperation.PAGE_LEN}
        surrounding-pages="3"
        current=${this._value}
        total=${total}
        @page-change=${this._onChange}
      ></shoestring-pagination>
    `;
  }
}
