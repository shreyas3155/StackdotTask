import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    editingProduct: null
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now().toString() // Generate unique ID
      };
      state.products.push(newProduct);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    editProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    setEditingProduct: (state, action) => {
      state.editingProduct = action.payload;
    },
    clearEditingProduct: (state) => {
      state.editingProduct = null;
    }
  },
});

export const { addProduct, deleteProduct, editProduct, setEditingProduct, clearEditingProduct } = productsSlice.actions;
export default productsSlice.reducer;