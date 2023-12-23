import { SearchLogic } from "../logic/search";
import "../common/search/SearchBox";
import { SearchResultsContainer } from "../common/search/SearchResultsContainer";
import "../common/search/SearchTools";

// this is temporary
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRoot } from "react-dom/client";

export function SearchPage() {
  return (
    <SearchLogic>
      <search-box />
      <search-tools />
      <SearchResultsContainer />
    </SearchLogic>
  );
}

@customElement("search-results-page")
export class SearchPageWrapper extends LitElement {
  #reactRoot;

  static styles = css`
    :host(.page) {
      position: static !important;
    }

    .metadata {
      color: #888;
    }

    #search-box sl-input,
    #search-results {
      width: var(--content-width);
    }

    #search-results > sl-spinner {
      margin-top: 42px;
    }

    #search-results-list {
      margin-top: 42px;
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
