import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { useSearchResults } from "../../logic/search";

@customElement("search-result-item")
export class SearchResultItem extends LitElement {
  static properties = {
    result: { type: Object },
  };

  static styles = css`
    .search-result-item {
      margin-bottom: 42px;
      font-size: 12pt;
    }

    .search-result-item > p,
    .search-result-item > div {
      margin: 3pt 0;
    }

    .search-result-title {
      font-size: 150%;
    }

    .search-result-snippet .searchmatch {
      font-weight: 600;
    }
  `;

  render() {
    return html`
      <div class="search-result-item" key="${this.result.pageid}">
        <a class="search-result-title" href="{result.link()}">
          ${this.result.title}
        </a>
        <p class="metadata">
          Last updated ${this.result.timestamp}; contains
          ${this.result.wordcount} words
        </p>
        <div class="search-result-snippet">
          ${unsafeHTML(this.result.snippet)}
        </div>
      </div>
    `;
  }
}

export function SearchResultsList() {
  const results = useSearchResults();

  return (
    <div id="search-results-list">
      {results.query.search.map((result) => (
        <search-result-item
          key={result.pageid}
          result={JSON.stringify(result)}
        />
      ))}
    </div>
  );
}
