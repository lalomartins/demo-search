import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("search-home-page")
export class HomePage extends LitElement {
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

  render() {
    return html`<div id="home-search-box">
      <search-box></search-box>
    </div>`;
  }
}
