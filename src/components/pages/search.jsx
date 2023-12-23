import "../common/search/SearchBox";
import "../common/search/SearchTools";
import "../common/search/SearchResultsContainer";

// this is temporary
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRoot } from "react-dom/client";

export function SearchPage() {
  return (
    <search-provider>
      <search-box />
      <search-tools />
      <search-results-container />
    </search-provider>
  );
}

@customElement("search-results-page")
export class SearchPageWrapper extends LitElement {
  #reactRoot;

  static styles = css`
    :host(.page) {
      position: static !important;
    }
  `;

  updated() {
    if (this.#reactRoot === undefined) {
      const rootElement = this.renderRoot.querySelector("#page-root");
      this.#reactRoot = createRoot(rootElement);
    }
    this.#reactRoot.render(<SearchPage />);
  }

  render() {
    return html`<div id="page-root"></div>`;
  }
}
