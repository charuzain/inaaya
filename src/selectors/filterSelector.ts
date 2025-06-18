import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import type { Product } from '../slice/productSlice';

export const selectAllProducts = (state: RootState) => state.product.products;

export const selectCategory = (state: RootState) => state.filter.category;

export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;

export const selectSort = (state: RootState) => state.filter.sort;

export const selectPrice = (state: RootState) => state.filter.selectedPrice;

export const filteredProduct = createSelector(
  [
    selectAllProducts,
    selectSearchTerm,
    selectCategory,
    selectSort,
    selectPrice,
  ],
  (products, searchTerm, category, { sortBy, order }, selectedPrice): Product[] => {
    let productList = [...products];

    if (searchTerm) {
      productList = productList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    console.log(sortBy);
    console.log(order);
    if (sortBy === 'price' && order === 'asc') {
      productList.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price' && order === 'desc') {
      productList.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'name' && order === 'asc') {
      productList.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'name' && order === 'desc') {
      productList.sort((a, b) => b.name.localeCompare(a.name));
    }

    
console.log(selectedPrice)
    if (selectedPrice || selectedPrice === 0) {
      console.log("seel")
      productList  = productList.filter((product) => selectedPrice >= product.price);
    }


    return category === 'all'
      ? productList
      : productList.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
  }
);
