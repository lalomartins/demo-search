import { LitElement, css, html } from "lit";

export class AppLogo extends LitElement {
  static styles = css`
    img {
      margin-right: 1em;
      height: 32px;
    }
  `;

  render() {
    return html`<img src="/assets/logo.svg" className="app-logo" alt="logo" />`;
  }
}
window.customElements.define("app-logo", AppLogo);
