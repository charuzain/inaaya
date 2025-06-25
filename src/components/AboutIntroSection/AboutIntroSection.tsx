import styles from './AboutIntroSection.module.css';

const AboutIntroSection = () => {
  return (
    <section className={styles['about-intro']}>
      <h2 className={styles['about-title']}>
        About Our Plus Size Clothing Store
      </h2>
      <p className={styles['about-description']}>
        Welcome to **Inaaya**, your ultimate destination for stylish and
        comfortable plus-size fashion. We believe that fashion is for everyone,
        regardless of size. Our mission is to empower individuals to express
        their unique style with confidence and joy.
      </p>
      <p className={styles['about-description']}>
        We curate a diverse collection of trendy and timeless pieces, from
        everyday essentials to statement-making outfits, all thoughtfully
        designed to fit and flatter every curve. Our commitment to quality,
        comfort, and inclusive sizing ensures that you'll find pieces that not
        only look good but feel amazing.
      </p>
      <p className={styles['about-description']}>
        Join us in celebrating diversity and self-love through fashion. At
        Inaaya, your style has no limits!
      </p>
    </section>
  );
};

export default AboutIntroSection;
