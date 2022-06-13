/** Пантовый вывод в консоль. Цвет: RED */
// eslint-disable-next-line no-console
export const logR = (message: unknown) => console.log('\x1b[31m\x1b[1m%s\x1b[0m', message);
/** Пантовый вывод в консоль. Цвет: GREEN */
// eslint-disable-next-line no-console
export const logG = (message: unknown) => console.log('\x1b[32m\x1b[1m%s\x1b[0m', message);
/** Пантовый вывод в консоль. Цвет: BLUE */
// eslint-disable-next-line no-console
export const logB = (message: unknown) => console.log('\x1b[34m\x1b[1m%s\x1b[0m', message);
