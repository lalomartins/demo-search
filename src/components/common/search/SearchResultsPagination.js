import { html, css } from "lit";
import { Router } from "@capitec/omni-router";
import "@lalomartins/shoestring-pagination";

import { RouteAwareElement } from "../../../lib/RouteAwareElement.js";

import { SearchOperation, SearchResultsConsumer } from "../../logic/search.js";

export class SearchResultsPagination extends SearchResultsConsumer(
  RouteAwareElement
) {
  static properties = {
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

  // eslint-disable-next-line class-methods-use-this
  _onChange(event) {
    const newParams = new URLSearchParams(
      Array.from(Object.entries(Router.currentLocation.queryParams))
    );
    newParams.set("page", event.detail.page);
    Router.push(`/search?${newParams}`);
  }

  render() {
    // Wikipedia API only returns up to 10000 results
    const total = Math.min(
      this.searchResults?.query?.searchinfo?.totalhits ?? 1,
      10000
    );

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
window.customElements.define(
  "search-results-pagination",
  SearchResultsPagination
);
