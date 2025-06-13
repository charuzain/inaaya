import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaInstagramSquare, FaFacebookSquare } from 'react-icons/fa';
import Logo from '../Logo/Logo';
const Footer = () => {
  return (
    <div className={styles['footer-container']}>
      <footer className={`wrapper ${styles['footer']}`}>
        <div className={styles['footer-detail']}>
          <div className={styles['footer-brand']}>
            <Logo />
            <p>
              Grace & Curves redefines plus-size fashion with expertly curated
              styles that feel as good as they look—because every body deserves
              beautiful clothes.
            </p>
            <div className={styles['footer-socials']}>
              <Link to={'https://www.facebook.com/'} target="_blank">
                <FaFacebookSquare />
              </Link>
              <Link to={'https://www.instagram.com/'}>
                <FaInstagramSquare />
              </Link>
              <Link to={'https://twitter.com/home'}>
                <FaSquareXTwitter />
              </Link>
            </div>
          </div>

          <div className={styles['footer-pages']}>
            <div className={styles['pages']}>
              <h5>Pages</h5>
              <Link to={'/'}>Home</Link>
              <Link to={'/about'}>About us</Link>
              <Link to={'/products'}>Products</Link>
              <Link to={'/cart'}>Cart</Link>
            </div>
          </div>
          <div className={styles['footer-contact']}>
            <div className={styles['contact-box']}>
              <h5>Reach us</h5>
              <div>Phone : (+123) 456 7890</div>
              <div>Email : gracencurves@gmail.com</div>
              <div>
                <div>Location : 12 A, East West Street</div>
                <div>Toronto, ON, CANADA </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          © 2025 Grace & Curves. All rights reserved. | Designed with love 💕,
          ☕️ and 🪄by{' '}
          <Link to={'https://github.com/charuzain'}>Charu Jain</Link>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
