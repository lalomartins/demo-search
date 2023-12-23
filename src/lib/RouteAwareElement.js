import { LitElement } from "lit";
import { Router } from "@capitec/omni-router";

/// A LitElement that reacts to location changes
export class RouteAwareElement extends LitElement {
  #locationChanged;

  locationChanged(event) {
    console.log("route changed", event);
  }

  connectedCallback() {
    super.connectedCallback();
    this.#locationChanged = this.locationChanged.bind(this);
    Router.addEventListener("route-loaded", this.#locationChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    Router.removeEventListener("route-loaded", this.#locationChanged);
  }
}
