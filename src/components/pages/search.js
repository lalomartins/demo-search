import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import "../common/search/SearchBox";
import "../common/search/SearchTools";
import "../common/search/SearchResultsContainer";

@customElement("search-results-page")
export class SearchPageWrapper extends LitElement {
  static styles = css`
    :host(.page) {
      position: static !important;
    }
  `;

  render() {
    return html`
      <search-provider>
        <search-box></search-box>
        <search-tools></search-tools>
        <search-results-container></search-results-container>
      </search-provider>
    `;
  }
}
