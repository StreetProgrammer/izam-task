import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducers/mainSlice'; // Import your reducer

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

export default store;