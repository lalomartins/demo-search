import { LitElement, css, html } from "lit";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";

import "./SearchResultsMetadata.js";
import "./SearchResultsPagination.js";
import "./SearchResultsList.js";
import { SearchResultsConsumer } from "../../logic/search.js";

export class SearchResultsContainer extends SearchResultsConsumer(LitElement) {
  static styles = css`
    :host {
      display: block;
      width: var(--content-width);
    }

    sl-spinner {
      margin-top: 42px;
    }
  `;

  render() {
    if (this.searchStatus !== "success")
      return html`<sl-spinner style="font-size: 3rem"></sl-spinner>`;
    return html`
      <search-results-metadata></search-results-metadata>
      <search-results-list></search-results-list>
      <search-results-pagination></search-results-pagination>
    `;
  }
}
window.customElements.define(
  "search-results-container",
  SearchResultsContainer
);
