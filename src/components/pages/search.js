import { css, html, LitElement } from "lit";

import "../common/search/SearchBox.js";
import "../common/search/SearchTools.js";
import "../common/search/SearchResultsContainer.js";

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
window.customElements.define("search-results-page", SearchPageWrapper);
