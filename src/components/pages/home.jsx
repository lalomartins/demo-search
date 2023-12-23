import { SearchBox } from "../common/search/SearchBox";

// this is temporary
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRoot } from "react-dom/client";

@customElement("search-home-page")
export class HomePageWrapper extends LitElement {
  #reactRoot;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    #home-search-box {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #search-box sl-input,
    #search-results {
      width: var(--content-width);
    }
  `;

  updated() {
    if (this.#reactRoot === undefined) {
      const rootElement = this.renderRoot.querySelector("#home-search-box");
      this.#reactRoot = createRoot(rootElement);
    }
    this.#reactRoot.render(<SearchBox />);
  }

  render() {
    return html`<div id="home-search-box"></div>`;
  }
}
