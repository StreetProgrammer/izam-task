import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menu: [
    
  ]
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMenu: (state, data) => {        
      state.menu = data.payload;
    },

  },
});

export const { setMenu } = mainSlice.actions;

export default mainSlice.reducer;