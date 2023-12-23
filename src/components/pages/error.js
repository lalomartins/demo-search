import { html, LitElement } from "lit";

export class ErrorPage extends LitElement {
  render() {
    return html`
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>Page not found</i>
        </p>
      </div>
    `;
  }
}
window.customElements.define("search-error-page", ErrorPage);
