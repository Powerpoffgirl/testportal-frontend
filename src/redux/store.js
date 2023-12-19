import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "../slices/sidebar/toggleSlice";


const store = configureStore({
  reducer: {
    sidebar: toggleSlice
  }
})
export default store
