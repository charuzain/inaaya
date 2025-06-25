import styles from './HomePage.module.css';
import Category from '../../components/Category/Category';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import SloganMarquee from '../../components/SloganMarquee/SloganMarquee';

import HeroSection from '../../components/Hero/HeroSection';

const HomePage = () => {
  return (
    <main className={styles['main']}>
      <HeroSection />

      <section className={styles['category-section']}>
        <Category />
      </section>

      <section className={styles['slogan-section']}>
        <SloganMarquee />
      </section>

      <section className={styles['new-section']}>
        <ProductSlider />
      </section>
    </main>
  );
};

export default HomePage;
