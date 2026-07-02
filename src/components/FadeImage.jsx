import { useEffect, useRef, useState } from "react";

// Плавна поява фото після завантаження замість різкого "поп-ін".
// ready=false тримає фото прихованим навіть після завантаження — дозволяє
// батьківському компоненту синхронізувати появу кількох фото (напр. банка+кришка).
export default function FadeImage({ className = "", onLoad, ready = true, ...imgProps }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  const visible = loaded && ready;

  return (
    <img
      ref={ref}
      {...imgProps}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`${visible ? "animate-fadeIn" : "opacity-0"} ${className}`}
    />
  );
}
