import SearchBar from '../components/SearchBar/SearchBar';
import CategoryDropDown from '../components/CategoryDropDown/CategoryDropDown';
import PriceFilter from '../components/PriceFilter/PriceFilter';
import SortFilter from '../components/SortFilter/SortFilter';
import ProductList from '../components/ProductList/ProductList';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  return (
    <main className={styles['product-page']}>
      <div className={styles['filters-wrapper']}>
        <SearchBar />
        <CategoryDropDown />
        <PriceFilter />
      </div>
      <div className={styles['result-section']}>
        <div className={styles['result-header']}>
          <p className={styles['result-count']}>0 product found</p>
          <SortFilter />
        </div>
        <div className={styles['list-wrapper']}>
          <ProductList />
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
