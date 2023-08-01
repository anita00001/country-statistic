import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './country/countrySlice';

export default configureStore({
  reducer: {
    country: countryReducer,
  },
});
