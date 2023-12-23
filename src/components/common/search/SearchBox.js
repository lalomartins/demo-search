import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@capitec/omni-router";
import "@shoelace-style/shoelace/dist/components/input/input";
import "@shoelace-style/shoelace/dist/components/icon/icon";
import "@shoelace-style/shoelace/dist/components/divider/divider";

import { RouteAwareElement } from "../../../lib/RouteAwareElement";

@customElement("search-box")
export class SearchBox extends RouteAwareElement {
  static properties = {
    _value: { state: true },
  };

  static styles = css`
    sl-input {
      width: var(--content-width);
    }
  `;

  constructor() {
    super();
    const location = Router.currentLocation;
    this._value = location.queryParams.q ?? "";
  }

  locationChanged({ current }) {
    this._value = current.queryParams.q ?? "";
  }

  _onChange(event) {
    const newParams = new URLSearchParams(
      Array.from(Object.entries(Router.currentLocation.queryParams))
    );
    newParams.set("q", event.target.value);
    newParams.set("page", 1);
    Router.push(`/search?${newParams}`);
  }

  render() {
    return html`
      <sl-input
        type="search"
        placeholder="input search text"
        clearable
        value=${this._value}
        @sl-change=${this._onChange}
      >
        <sl-divider vertical slot="suffix"></sl-divider>
        <sl-icon name="search" slot="suffix"></sl-icon>
      </sl-input>
    `;
  }
}
