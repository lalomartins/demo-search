import { SearchProviderReact } from "../logic/search";
import "../common/search/SearchBox";
import "../common/search/SearchTools";
import { SearchResultsContainer } from "../common/search/SearchResultsContainer";

// this is temporary
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRoot } from "react-dom/client";

export function SearchPage() {
  return (
    <search-provider>
      <search-box />
      <search-tools />
      <SearchResultsContainer />
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
