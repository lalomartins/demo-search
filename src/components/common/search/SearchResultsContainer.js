import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner";

import "./SearchResultsMetadata";
import "./SearchResultsPagination";
import "./SearchResultItem";
import { SearchResultsConsumer } from "../../logic/search";

@customElement("search-results-container")
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
      return html`<sl-spinner style="font-size: 3rem" />`;
    return html`
      <search-results-metadata></search-results-metadata>
      <search-results-list></search-results-list>
      <search-results-pagination></search-results-pagination>
    `;
  }
}
