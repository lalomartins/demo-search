import { Router } from "@capitec/omni-router";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import "@polymer/app-layout/app-scroll-effects/effects/waterfall";
import "@polymer/app-layout/app-layout";
import { ContextRoot } from "@lit/context";

import "./components/common/layout/logo";
import "./components/pages/home";
import "./components/pages/search";
import "./components/pages/error";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.12.0/cdn/"
);

Router.addRoute({
  name: "search-home-page",
  title: "Lit Search Demo",
  path: "/",
  isDefault: true,
});

Router.addRoute({
  name: "search-results-page",
  title: "Lit Search Demo Results",
  path: "/search",
});

Router.addRoute({
  name: "search-error-page",
  title: "Error",
  path: "/error404",
  isFallback: true,
});

new ContextRoot().attach(document.body);
Router.load();
