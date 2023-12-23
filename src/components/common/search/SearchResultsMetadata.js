import { LitElement, css, html } from "lit";

import { SearchResultsConsumer } from "../../logic/search.js";

export class SearchResultsMetadata extends SearchResultsConsumer(LitElement) {
  static styles = css`
    :host {
      display: block;
      color: var(--sl-color-neutral-500);
    }
  `;

  render() {
    return html`
      ${this.searchResults?.query?.searchinfo?.totalhits} total results
    `;
  }
}
window.customElements.define("search-results-metadata", SearchResultsMetadata);
