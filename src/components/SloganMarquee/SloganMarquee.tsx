import styles from './SloganMarquee.module.css';

import {
  FaTshirt,
  FaHeart,
  FaFeatherAlt,
  FaRulerCombined,
  FaStar,
} from 'react-icons/fa';

const slogans = [
  { text: 'Style for Every Body', icon: <FaTshirt size={20} /> },
  { text: 'Celebrate Your Curves', icon: <FaHeart size={20} /> },
  { text: 'Comfort Meets Fashion', icon: <FaFeatherAlt size={20} /> },
  { text: 'Inclusive Sizing', icon: <FaRulerCombined size={20} /> },
  { text: 'Uncompromised Quality', icon: <FaStar size={20} /> },
];

const SloganMarquee = () => {
  const duplicatedSlogans = [...slogans, ...slogans, ...slogans];

  return (
    <div className={styles['slogan-marquee-section']}>
      <div className={styles['marquee-content']}>
        {duplicatedSlogans.map((slogan, index) => (
          <div className={styles['slogan-item']} key={index}>
            {slogan.icon}
            <span>{slogan.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SloganMarquee;
