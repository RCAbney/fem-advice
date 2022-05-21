import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./QuoteCard.module.css";
import { getQuote } from "../lib/getQuote";
import { getRandoNum } from "../lib/getRandoNum";

const QuoteCard = () => {
  const handleClick = (e) => {
    const url = `https://api.adviceslip.com/advice/${getRandoNum(1, 224)}`;
    e.preventDefault();
    getQuote(url, setQuote, setFetching);
  };
  const [quote, setQuote] = useState({});
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const url = `https://api.adviceslip.com/advice`;
    getQuote(url, setQuote, setFetching);
  }, []);

  return (
    <div className={styles.quoteCardWrapper}>
      {fetching ? (
        <div className={styles.fetching}>
          <p>fetching some good advice</p>
          <div className={styles.spinner}>
            <div className={styles.doubleBounce1}></div>
            <div className={styles.doubleBounce2}></div>
          </div>
        </div>
      ) : (
        <div className={styles.quoteWrap}>
          <p className={styles.advice}>Advice #{quote?.slip?.id}</p>
          <p className={styles.quoteText}>"{quote?.slip?.advice}"</p>
          <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
              <g transform="translate(138)" fill="#CEE3E9">
                <rect width="6" height="16" rx="3" />
                <rect x="14" width="6" height="16" rx="3" />
              </g>
            </g>
          </svg>
        </div>
      )}
      <Button handleClick={handleClick} />
    </div>
  );
};

export default QuoteCard;