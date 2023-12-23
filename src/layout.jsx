import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "@polymer/app-layout/app-layout";
import "@polymer/app-layout/app-scroll-effects/effects/waterfall";

import logo from "./logo.svg";

// eslint-disable-next-line no-unused-vars
const { Header, Footer, Content } = Layout;

export function MainLayout() {
  return (
    <>
      <app-header-layout>
        <app-header slot="header" fixed effects="waterfall">
          <app-toolbar>
            <img
              src={logo}
              className="App-logo"
              alt="logo"
              style={{ height: 32 }}
            />
            <h1 main-title="">Lit Search Demo</h1>
          </app-toolbar>
        </app-header>
        <main>
          <Outlet />
        </main>
      </app-header-layout>
      <footer>
        ©2023 {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a href="https://lalomartins.info/" target="_blank">
          Lalo Martins
        </a>
      </footer>
    </>
  );
}
