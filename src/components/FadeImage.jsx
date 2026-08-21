import { useEffect, useRef, useState } from "react";

const POSITION_CLASS = /\b(absolute|fixed|sticky)\b/;

// Плавна поява фото після завантаження замість різкого "поп-ін".
// skeleton=true (дефолт) додає sand-заливку+pulse на місці фото під час
// завантаження: className йде на обгортку (розмір/позиція), imgClassName —
// на сам img (object-fit і подібне). skeleton=false — стара поведінка без
// обгортки, className прямо на img (для нестандартного позиціонування:
// transform-зсуви, вкладеність у <picture>).
// ready=false тримає фото прихованим навіть після завантаження — дозволяє
// батьківському компоненту синхронізувати появу кількох фото (напр. банка+кришка).
export default function FadeImage({
  className = "",
  imgClassName = "",
  onLoad,
  ready = true,
  skeleton = true,
  skeletonClassName = "bg-brand-sand",
  ...imgProps
}) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  const visible = loaded && ready;

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  if (!skeleton) {
    return (
      <img
        ref={ref}
        {...imgProps}
        onLoad={handleLoad}
        className={`${visible ? "animate-fadeIn" : "opacity-0"} ${className}`}
      />
    );
  }

  const wrapperClass = POSITION_CLASS.test(className) ? className : `relative ${className}`;

  return (
    <div className={wrapperClass}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${skeletonClassName} pointer-events-none transition-opacity duration-300 ${
          visible ? "opacity-0" : "opacity-100 animate-pulse"
        }`}
      />
      <img
        ref={ref}
        {...imgProps}
        onLoad={handleLoad}
        className={`absolute inset-0 w-full h-full ${visible ? "animate-fadeIn" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}
