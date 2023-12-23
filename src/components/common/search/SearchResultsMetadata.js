import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

import { SearchResultsConsumer } from "../../logic/search";

@customElement("search-results-metadata")
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
