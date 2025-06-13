import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import type { Product } from '../slice/productSlice';

export const selectAllProducts = (state: RootState) => state.product.products;

export const selectCategory = (state: RootState) => state.filter.category;

export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;

export const selectSort = (state: RootState) => state.filter.sort;

export const filteredProduct = createSelector(
  [selectAllProducts, selectSearchTerm, selectCategory],
  (products, searchTerm, category): Product[] => {
    let productList = [...products];

    if (searchTerm) {
      productList = productList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return category === 'all'
      ? productList
      : productList.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
  }
);
