import styles from './HomePage.module.css';
import heroImage from './../assets/images/about3.png';
import { MdArrowRightAlt } from 'react-icons/md';
import Category from '../components/Category/Category';
import ProductSlider from '../components/ProductSlider/ProductSlider';
import SloganMarquee from '../components/SloganMarquee/SloganMarquee';

const HomePage = () => {
  return (
    <main className={styles['main']}>
      <div className={styles['hero-section']}>
        <section className={styles['hero-text']}>
          <h1 className={styles['hero-title']}>
            Fashion That Fits Your Curves, Flatter Your Style.
          </h1>
          <p className={styles['hero-subtitle']}>
            Discover a world where fashion meets comfort, designed exclusively
            to celebrate every curve. Embrace styles that empower you to look
            and feel your best, every single day
          </p>
          <button className={styles['hero-cta-button']}>
            Shop Now <MdArrowRightAlt />
          </button>
        </section>
        <section className={styles['hero-image-container']}>
          <img
            src={heroImage}
            alt="Hero Image"
            className={styles['hero-image']}
          />
        </section>
      </div>

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
