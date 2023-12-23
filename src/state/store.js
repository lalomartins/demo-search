import { configureStore } from "@reduxjs/toolkit";
import search from "./search";

export const store = configureStore({
  reducer: {
    search,
  },
});
