export const CONTAINER_WIDTH = 358.67;
export const CONTAINER_HEIGHT = 648;

export const QUESTIONNAIRE_WIDTH = 500;

export const aspectRatio = `${CONTAINER_WIDTH} / ${CONTAINER_HEIGHT}`;

const toCqi = (px) => `calc(${px} / ${CONTAINER_WIDTH} * 100cqi)`;
const toCqw = (px) => `calc(${px} / ${CONTAINER_WIDTH} * 100cqw)`;
const toCqh = (px) => `calc(${px} / ${CONTAINER_HEIGHT} * 100cqh)`;


export const indicatorSizes = {
  rightBlock: toCqi(210),     // Ширина правої частини
  sideLabel: toCqi(75),       // Ширина підписів
  dotsBlock: toCqi(56),       // Ширина блоку з кружечками
  dotSize: toCqi(7),          // Розмір кружечків
  dotsGap: toCqi(3.5),        // Відступ між кружечками
};

export const cardSizes = {
  paddingX: toCqw(20),
  hoverLift: toCqh(59),
  imageWidth: toCqw(CONTAINER_WIDTH * 0.75), // 75% від ширини картки
  imageMarginTop: toCqh(90),
  titleMarginTop: toCqh(12),
  descriptionMarginTop: toCqh(17),
  priceMarginTop: toCqh(15),
  overlayBottom: toCqh(26),
  lineBottom: toCqh(18),
  overlayGap: toCqh(4),
};