import SearchBar from '../components/SearchBar/SearchBar';
import CategoryDropDown from '../components/CategoryDropDown/CategoryDropDown';
import PriceFilter from '../components/PriceFilter/PriceFilter';
import SortFilter from '../components/SortFilter/SortFilter';
import ProductList from '../components/ProductList/ProductList';
import styles from './ProductsPage.module.css';
import { useAppSelector } from '../app/hooks';
import { filteredProduct } from '../selectors/filterSelector';

const ProductsPage = () => {
  const productList = useAppSelector(filteredProduct);

  return (
    <>
      <main className={styles['product-page']}>
        <div className={styles['filters-wrapper']}>
          <SearchBar />
          <CategoryDropDown />
          <PriceFilter />
        </div>
        <div className={styles['result-section']}>
          <div className={styles['result-header']}>
            <p className={styles['result-count']}>
              {productList.length} product found
            </p>
            <SortFilter />
          </div>

          <div className={styles['list-wrapper']}>
            <ProductList />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
