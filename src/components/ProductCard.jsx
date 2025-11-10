import IndicatorRow from "./IndicatorRow";

function ProductCard({ image, name, description, price, cardBg }) {
  return (
    <div
      className="group relative w-[387px] h-[628px] rounded-[12px] overflow-hidden cursor-pointer"
      style={{ backgroundColor: cardBg }}
    >
      {/* далі все без змін */}

      {/* Внутрішній блок, що плавно рухається */}
      <div
        className="
          absolute left-0 w-full flex flex-col items-center 
          will-change-transform transition-transform duration-500 ease-out 
          translate-y-0 group-hover:-translate-y-[65px]
        "
      >
      {/* Фото */}
      <div
        className="
          mt-[89px] w-[340px] h-[340px] overflow-hidden
          transition-transform duration-500 ease-out
          group-hover:scale-105
        "
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>


        {/* Назва */}
        <h2 className="mt-[5px] text-[42px] font-medium italic font-['Cormorant_Garamond']">
          {name}
        </h2>

        {/* Опис */}
        <p className="mt-[-3px] text-[12px] font-normal font-['Montserrat']">
          {description}
        </p>

        {/* Ціна */}
        <p className="mt-[11px] text-[12px] font-semibold font-['Montserrat']">
          від ₴ {price}
        </p>
      </div>

      {/* Лінія + індикатори */}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 w-[340px]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500 ease-out delay-100
        "
      >
        {/* Роздільча лінія */}
        <div className="absolute top-[506px] w-[340px] h-[0.5px] bg-[#DAC284]" />

        {/* Індикатори */}
        <div className="absolute top-[526px]">
          <IndicatorRow
            label="Колір"
            leftLabel="Світлий"
            rightLabel="Темний"
            value={4}
          />
        </div>
        <div className="absolute top-[551px]">
          <IndicatorRow
            label="Пружність"
            leftLabel="М’яка"
            rightLabel="Щільна"
            value={3}
          />
        </div>
        <div className="absolute top-[576px]">
          <IndicatorRow
            label="Розмір"
            leftLabel="Дрібний"
            rightLabel="Великий"
            value={5}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
