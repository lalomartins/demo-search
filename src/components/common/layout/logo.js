import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-logo")
export class AppLogo extends LitElement {
  static styles = css`
    img {
      margin-right: 1em;
      height: 32px;
    }
  `;

  render() {
    return html`<img src="/logo.svg" className="app-logo" alt="logo" />`;
  }
}
