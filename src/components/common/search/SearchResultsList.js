import { LitElement, html, css } from "lit";

import { SearchResultsConsumer } from "../../logic/search.js";
import "./SearchResultItem.js";

export class SearchResultsList extends SearchResultsConsumer(LitElement) {
  static styles = css`
    :host {
      margin-top: 42px;
      display: block;
    }
  `;

  render() {
    return this.searchResults?.query?.search.map(
      result =>
        html` <search-result-item .result=${result}></search-result-item> `
    );
  }
}
window.customElements.define("search-results-list", SearchResultsList);
