import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles['logo-box']}>
      <span className={styles['brand-name']}>Inaaya</span>
      <span className={styles['circle']}></span>
    </div>
  );
};

export default Logo;
