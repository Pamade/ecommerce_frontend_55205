import React, { useState } from "react";
import styles from "./FAQ.module.scss";

const faqs = [
  {
    question: "What materials are your clothes made from?",
    answer:
      "Our clothing is made from a variety of materials, including cotton, polyester, wool, linen, and sustainable fabrics like organic cotton and recycled fibers. Each product description provides detailed fabric information.",
  },
  {
    question: "How do I find the right size?",
    answer:
      "We provide a detailed size chart on each product page. If you're unsure, we recommend measuring yourself and comparing it with our guide.",
  },
  {
    question: "Do your clothes shrink after washing?",
    answer:
      "Some natural fabrics like cotton may shrink slightly after the first wash. To minimize shrinkage, follow the care instructions on the label and avoid high heat when washing and drying.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We offer hassle-free returns and exchanges within 30 days of purchase, provided the items are unworn, unwashed, and in original condition with tags attached.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we offer worldwide shipping. Shipping costs and delivery times vary depending on your location.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const toggleFAQ = (index:number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.title}>Frequently Asked Questions</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ""}`}
          >
            <button className={styles.question} onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && <p className={styles.answer}>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
