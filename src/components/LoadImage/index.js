import React, { useState, useEffect } from 'react';
import Loading from '../../assets/Spinner-2.gif';

const ImageLoad = React.memo(({ src, alt = "" }) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, updateSrc] = useState(Loading);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setLoading(false);
      updateSrc(src);
    }
  }, [src])

  return (
    <img
      src={currentSrc}
      style={{
        opacity: loading ? 0.5 : 1,
        transition: "opacity .15s linear"
      }}
      alt={alt}
    />
  )
});

export default ImageLoad;