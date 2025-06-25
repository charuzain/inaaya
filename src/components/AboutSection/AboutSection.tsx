import styles from './AboutSection.module.css';

type AboutSectionProps = {
  image: string;
  title: string;
  text: string;
  imageLeft: boolean;
};
const AboutSection = ({ image, title, text, imageLeft }: AboutSectionProps) => {
  return (
    <div
      className={`${styles['about-grid-item']} ${
        imageLeft ? styles['image-left'] : styles['image-right']
      }`}
    >
      <div className={styles['image-wrapper']}>
        <img src={image} alt={title} className={styles['grid-image']} />
      </div>
      <div className={styles['about-text']}>
        <h3 className={styles['about-title']}>{title}</h3>
        <p className={styles['about-description']}>{text}</p>
      </div>
    </div>
  );
};

export default AboutSection;
