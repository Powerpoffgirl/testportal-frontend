import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen: true, // Initial state of the sidebar (true for open, false for closed)
  };

  const toggleSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
      openSidebar: (state) => {
        state.isOpen = true;
      },
      closeSidebar: (state) => {
        state.isOpen = false;
      },
      toggleSidebar: (state) => {
        state.isOpen = !state.isOpen;
      },
    },
  });

  export const { openSidebar, closeSidebar, toggleSidebar } = toggleSlice.actions;
export default toggleSlice.reducer;