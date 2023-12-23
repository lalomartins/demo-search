import { html, css } from "lit";
import { Router } from "@capitec/omni-router";
import "@shoelace-style/shoelace/dist/components/radio-button/radio-button.js";
import "@shoelace-style/shoelace/dist/components/radio-group/radio-group.js";

import { RouteAwareElement } from "../../../lib/RouteAwareElement.js";

export class SearchTools extends RouteAwareElement {
  static properties = {
    _value: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      margin-top: 3pt;
    }
  `;

  constructor() {
    super();
    const location = Router.currentLocation;
    this._value = location.queryParams.r ?? "engine_autoselect";
  }

  locationChanged({ current }) {
    this._value = current.queryParams.r ?? "engine_autoselect";
  }

  // eslint-disable-next-line class-methods-use-this
  _onChange(event) {
    const newParams = new URLSearchParams(
      Array.from(Object.entries(Router.currentLocation.queryParams))
    );
    newParams.set("r", event.target.value);
    newParams.set("page", 1);
    Router.push(`/search?${newParams}`);
  }

  render() {
    return html`
      <sl-radio-group
        name="r"
        size="small"
        value=${this._value}
        @sl-change=${this._onChange}
      >
        <sl-radio-button value="engine_autoselect"
          >Default ranking</sl-radio-button
        >
        <sl-radio-button value="popular_inclinks_pv">
          Popular (views)
        </sl-radio-button>
        <sl-radio-button value="popular_inclinks">Links</sl-radio-button>
      </sl-radio-group>
    `;
  }
}
window.customElements.define("search-tools", SearchTools);
