import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import { FaArrowAltCircleUp } from 'react-icons/fa';

function ScrollToTop () {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={styles.scrollToTop}>
      {isVisible && (
        <div onClick={scrollToTop}>
          <FaArrowAltCircleUp size={50}
          />
        </div>
      )}
    </div>
  );
}

export default ScrollToTop