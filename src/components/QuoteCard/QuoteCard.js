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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [quote, setQuote] = useState({});
  const [fetching, setFetching] = useState(true);

  const updateWidth = () => {
    setIsMobile(window.innerWidth < 769);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  useEffect(() => {
    const url = `https://api.adviceslip.com/advice`;
    getQuote(url, setQuote, setFetching);
  }, []);

  return (
    <div className={styles.quoteCardWrapper}>
      {fetching ? (
        <div className={styles.fetching}>
          <h1>fetching some good advice</h1>
          <div className={styles.spinner}>
            <div className={styles.doubleBounce1}></div>
            <div className={styles.doubleBounce2}></div>
          </div>
        </div>
      ) : (
        <div className={styles.quoteWrap}>
          <h1 className={styles.advice}>Advice #{quote?.slip?.id}</h1>
          <p className={styles.quoteText}>"{quote?.slip?.advice}"</p>
          {isMobile ? (
            <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
                <g transform="translate(138)" fill="#CEE3E9">
                  <rect width="6" height="16" rx="3" />
                  <rect x="14" width="6" height="16" rx="3" />
                </g>
              </g>
            </svg>
          ) : (
            <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
                <g transform="translate(212)" fill="#CEE3E9">
                  <rect width="6" height="16" rx="3" />
                  <rect x="14" width="6" height="16" rx="3" />
                </g>
              </g>
            </svg>
          )}
        </div>
      )}
      <Button handleClick={handleClick} />
    </div>
  );
};

export default QuoteCard;
