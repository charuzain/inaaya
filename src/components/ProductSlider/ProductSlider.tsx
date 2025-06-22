import { useEffect, useRef } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaChevronRight } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../slice/productSlice';
import NewProductCard from '../NewProductCard/NewProductCard';
import styles from './Productslider.module.css';

const ProductSlider = () => {
  const { products, status } = useAppSelector((state) => state.product);
  console.log(products);
  const newProduct = products.filter((product) => product.new);
  console.log(newProduct);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const scrollContainerRef = useRef(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  };
  if (status === 'loading') {
    return <p>Loading....</p>;
  }

  return (
    <div className={styles['slider-container']}>
      <h2 className={styles['slider-title']}>New Arrivals</h2>

      <div className={styles['slider-content-wrapper']}>
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll(-300)}
          className={styles['slider-nav-button-left']}
          aria-label="Scroll left"
        >
          <FaAngleLeft size={24}  />
        </button>

        <div
          ref={scrollContainerRef}
          className={styles['scrollable-cards-wrapper']}
        >
          {newProduct.map((product) => (
            <NewProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll(300)}
          className={styles['slider-nav-button-right']}
          aria-label="Scroll right"
        >
          <FaChevronRight size={24}  />
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
