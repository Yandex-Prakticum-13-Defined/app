/**
 * Преобразование даты из базы к читабельному виду
 * @param date - строка вида "2022-06-16 20:20:23.808+00"
 * */
export const getDate = (date: string) => new Date(date).toISOString()
  .replace(/T/, ' ')
  .replace(/\..+/, '');
