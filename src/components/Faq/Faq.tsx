import { useState } from 'react';
import FAQItem from '../FAQItem/FAQItem';
import styles from './Faq.module.css';

const faqs = [
  {
    id: 1,
    question: 'What makes your sizing truly inclusive?',
    answer:
      'We believe in fashion for every body. Our garments are designed from scratch with diverse body shapes in mind, ensuring a comfortable and flattering fit across all sizes. We use extensive fit testing with real people, not just mannequins, to perfect our patterns.',
  },
  {
    id: 2,
    question: 'What materials do you use?',
    answer:
      'We prioritize high-quality, breathable, and durable fabrics that offer comfort and style. Our collection features a mix of natural fibers like cotton and linen, as well as innovative blends designed for stretch and longevity.',
  },
  {
    id: 3,
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we do! We offer international shipping to many countries worldwide. Shipping costs and delivery times vary by destination. You can find more details on our Shipping Policy page.',
  },
  {
    id: 4,
    question: 'What is your return policy?',
    answer:
      'We offer hassle-free returns within 30 days of purchase for unworn, unwashed items with tags still attached. Visit our Returns page for detailed instructions and eligibility criteria.',
  },
];

const Faq = () => {
  const [openId, setOpenId] = useState<null | number>(null);

  const setId = (id: number) => {
    if (id === openId) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section className={styles['faq-section']}>
      <h3 className={styles['faq-title']}>Frequently Asked Questions</h3>
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          id={faq.id}
          openId={openId}
          setId={setId}
        />
      ))}
    </section>
  );
};

export default Faq;
