/**
 * Преобразование даты из базы к читабельному виду
 * @param date - строка вида "2022-06-18T10:34:24.457Z"
 * */
export const getDate = (date: string) => new Date(date).toLocaleString()
  .replace(',', '');
