export const CONTAINER_WIDTH = 405;
export const CONTAINER_HEIGHT = 670;

export const QUESTIONNAIRE_WIDTH = 500;

export const aspectRatio = `${CONTAINER_WIDTH} / ${CONTAINER_HEIGHT}`;

const toCqi = (px) => `calc(${px} / ${CONTAINER_WIDTH} * 100cqi)`;
const toCqw = (px) => `calc(${px} / ${CONTAINER_WIDTH} * 100cqw)`;
const toCqh = (px) => `calc(${px} / ${CONTAINER_HEIGHT} * 100cqh)`;


export const indicatorSizes = {
  rightBlock: toCqi(200),     // Ширина правої частини
  sideLabel: toCqi(75),       // Ширина підписів
  dotSize: toCqi(7),          // Розмір кружечків
  dotsGap: toCqi(3.5),        // Відступ між кружечками
};

export const cardSizes = {
  paddingX: toCqw(36),
  hoverLift: toCqh(48),
  imageMarginTop: toCqh(84),
  titleMarginTop: toCqh(2),
  descriptionMarginTop: toCqh(23),
  priceMarginTop: toCqh(9),
  overlayBottom: toCqh(31),
  lineBottom: toCqh(13),
  overlayGap: toCqh(5),
};