import AboutIntroSection from '../../components/AboutIntroSection/AboutIntroSection';
import AboutSection from '../../components/AboutSection/AboutSection';
import Faq from '../../components/Faq/Faq';
import image1 from '../../assets/images/about1.png';

import image2 from '../../assets/images/about2.png';
import image3 from '../../assets/images/about3.png';

import image4 from '../../assets/images/about4.png';
import styles from './AboutPage.module.css';
const aboutSectionsData = [
  {
    id: 1,
    image: image1,
    title: 'Our Mission: Empowering Every Body',
    text: 'At Inaaya, we are dedicated to providing fashionable, high-quality clothing that fits and flatters every plus-size body. We believe in celebrating individuality and ensuring that everyone feels confident and stylish in their own skin. Our designs focus on inclusive sizing and thoughtful construction.',
    imageLeft: true,
  },
  {
    id: 2,
    image: image2,
    title: 'Craftsmanship & Comfort',
    text: 'Quality is at the heart of everything we do. From the selection of premium fabrics to the meticulous attention to detail in stitching and finishing, we ensure our garments are not only beautiful but also durable and comfortable for everyday wear. Experience the difference of clothing made with care.',
    imageLeft: false,
  },
  {
    id: 3,
    image: image3,
    title: 'Sustainable & Ethical Practices',
    text: "We are committed to building a sustainable future. Our practices prioritize ethical sourcing, responsible manufacturing, and minimizing environmental impact. We strive to create fashion that you can feel good about wearing, knowing it's made with respect for people and the planet.",
    imageLeft: true,
  },
  {
    id: 4,
    image: image4,
    title: 'Join Our Community',
    text: "Inaaya is more than just a clothing store; it's a community where everyone belongs. We foster a positive and inclusive environment where you can connect with like-minded individuals, share your style, and be inspired. Follow us on social media and become a part of our growing family!",
    imageLeft: false,
  },
];

const AboutPage = () => {
  return (
    <main className={styles['about-page']}>
      <AboutIntroSection />
      <section className={styles['about-section-container']}>
        {aboutSectionsData.map((section) => (
          <AboutSection
            key={section.id}
            image={section.image}
            title={section.title}
            text={section.text}
            imageLeft={section.imageLeft}
          />
        ))}
      </section>

      <Faq />
    </main>
  );
};

export default AboutPage;
