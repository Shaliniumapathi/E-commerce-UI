import Product from '../../ProductsContent'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: Product,
  filterItem: Product,
  searchTerms: "",
  selectedCategory: "All",
  suggestions: [],
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerms: (state, action) => {
      state.searchTerms = action.payload;

      if (action.payload.trim() === "") {
        state.suggestions = [];
        state.filterItem = state.items;
        return;
      }

      state.suggestions = state.items.filter((p) =>
        p.title.toLowerCase().includes(action.payload.toLowerCase()) ||
        p.category.toLowerCase().includes(action.payload.toLowerCase())
      );

      state.filterItem = state.items.filter((p) =>
        p.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    setSearchCategory: (state, action) => {
      state.selectedCategory = action.payload;

      if (!action.payload || action.payload === 'All') {
        state.filterItem = state.items;
        state.suggestions = [];
        return;
      }

      state.filterItem = state.items.filter(
        (p) => p.category.toLowerCase() === action.payload.toLowerCase()
      );
      state.suggestions = state.filterItem;
    },

    clearSearch: (state) => {
      state.searchTerms = "";
      state.suggestions = [];
      state.filterItem = state.items;
    }
  }
});

export const { setSearchTerms, setSearchCategory, clearSearch } = ProductSlice.actions;
export default ProductSlice.reducer;



