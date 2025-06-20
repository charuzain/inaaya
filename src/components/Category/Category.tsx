import React from 'react';
import styles from './Category.module.css';
import { MdArrowRightAlt } from 'react-icons/md';
import topImage from './../../assets/images/category/top.webp';
import dressImage from './../../assets/images/category/dress.webp';
import jacketImage from './../../assets/images/category/jacket.webp';
import bottomImage from './../../assets/images/category/bottom.webp';

const categories = [
  {
    name: 'Dresses',
    image: dressImage,
  },
  {
    name: 'Tops',
    image: topImage,
  },
  {
    name: 'Bottom',
    image: bottomImage,
  },
  {
    name: 'Jackets',
    image: jacketImage,
  },
];

const Category = () => {
  return (
    <div className={styles['category']}>
      <h2>Browse Product By Category</h2>
      <div className={styles['category-cards-grid']}>
        {categories.map((category, index) => (
          <div className={styles['category-card']} key={index}>
            <img
              src={category.image}
              alt={category.name}
              className={styles['category-card-image']}
            />
            <div className={styles['category-overlay']}>
              <span className={styles['category-name']}>{category.name}</span>
              <MdArrowRightAlt size={20} className={styles['category-arrow']} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
