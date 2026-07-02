import { useEffect, useRef, useState } from "react";

// Плавна поява фото після завантаження замість різкого "поп-ін".
export default function FadeImage({ className = "", ...imgProps }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <img
      ref={ref}
      {...imgProps}
      onLoad={() => setLoaded(true)}
      className={`${loaded ? "animate-fadeIn" : "opacity-0"} ${className}`}
    />
  );
}
