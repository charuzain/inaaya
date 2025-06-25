import { useDispatch } from 'react-redux';

import { setCategory } from './../../slice/filterSlice';
import { MdArrowRightAlt } from 'react-icons/md';
import heroImage from './../../assets/images/about3.png';


import styles from './Herosection.module.css';
import { useNavigate } from 'react-router';

const HeroSection = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className={styles['hero-section']}>
      <section className={styles['hero-text']}>
        <h1 className={styles['hero-title']}>
          Fashion That Fits Your Curves, Flatter Your Style.
        </h1>
        <p className={styles['hero-subtitle']}>
          Discover a world where fashion meets comfort, designed exclusively to
          celebrate every curve. Embrace styles that empower you to look and
          feel your best, every single day
        </p>
        <button
          className={styles['hero-cta-button']}
          onClick={() => {
            dispatch(setCategory('all'));

            navigate('/products');
          }}
        >
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
  );
};

export default HeroSection;
