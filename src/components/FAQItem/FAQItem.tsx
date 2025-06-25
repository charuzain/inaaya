import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import styles from './FAQItem.module.css';
type FAQItemProps = {
  question: string;
  answer: string;
  id: number;
  openId: number | null;
  setId: (id: number) => void;
};
const FAQItem = ({ question, answer, id, openId, setId }: FAQItemProps) => {
  const isOpen = id === openId;
  console.log(isOpen);
  return (
    <div className={styles['faq-item']}>
      <div onClick={() => setId(id)} className={styles['question-container']}>
        <p>{question}</p>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </div>
      <div
        className={`${styles['answer-wrapper']} ${
          isOpen ? styles['show'] : ''
        }`}
      >
        <p className={styles['answer']}>{answer}</p>
      </div>
    </div>
  );
};

export default FAQItem;
