import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import SlInput from "@shoelace-style/shoelace/dist/react/input";
import SlIcon from "@shoelace-style/shoelace/dist/react/icon";
import SlDivider from "@shoelace-style/shoelace/dist/react/divider";

import { Router } from "@capitec/omni-router";

export function SearchBox() {
  const location = Router.currentLocation;
  function onChange(event) {
    console.log(event);
    const newParams = new URLSearchParams(
      Array.from(Object.entries(location.queryParams))
    );
    newParams.set("q", event.target.value);
    newParams.set("page", 1);
    Router.push(`/search?${newParams}`);
  }

  return (
    <div id="search-box">
      <SlInput
        type="search"
        placeholder="input search text"
        clearable
        value={location.queryParams.q ?? ""}
        onSlChange={onChange}
      >
        <SlDivider vertical slot="suffix" />
        <SlIcon name="search" slot="suffix" />
      </SlInput>
    </div>
  );
}

@customElement("search-box")
export class SearchBoxLit extends LitElement {
  static styles = css`
  sl-input
    width: var(--content-width);
  }
  `;

  render() {
    return html``;
  }
}
