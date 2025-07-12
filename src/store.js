import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productslice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});