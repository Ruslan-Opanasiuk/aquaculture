// src/theme/fontSizes.js

import { CONTAINER_WIDTH, QUESTIONNAIRE_WIDTH } from "./sizes";

// Коефіцієнти масштабування
export const FONT_MIN_COEF = 0.67;
export const FONT_MAX_COEF = 1.1;

// Генератор clamp-фонтів
export const makeClampFont = (basePx, container = CONTAINER_WIDTH) => `
  clamp(
    calc(${basePx} * ${FONT_MIN_COEF} / 16 * 1rem),
    calc(${basePx} / ${container} * 100cqi),
    calc(${basePx} * ${FONT_MAX_COEF} / 16 * 1rem)
  )
`;

export const CARD_FONTS = {
  title: 58,
  subtitle: 18.87,
  price: 18.87,
  indicator: 16.18,
};

export const cardFonts = Object.fromEntries(
  Object.entries(CARD_FONTS).map(([key, base]) => [
    key,
    makeClampFont(base),
  ])
);

export const QUESTIONNAIRE_FONTS = {
  title: 46,
  subtitle: 15,
  placeholder: 17,
};

export const questionnaireFonts = Object.fromEntries(
  Object.entries(QUESTIONNAIRE_FONTS).map(([key, base]) => [
    key,
    makeClampFont(base),
  ])
);