import { CENTURY_PREFIX, MONTH } from '../constants';

export const validateFilledValue = (value: string) => {
  return !!value;
};

export const validateNumber = (value: string) => {
  return Number.isInteger(Number(value));
};

export const validateLength = (value: string, length: number) => {
  return value.length === length;
};

export const validateYear = (year: string) => {
  const currentDate = new Date();
  return Number(year) >= currentDate.getFullYear() - CENTURY_PREFIX;
};

export const validateMonth = (month: string) => {
  const { startNumber, endNumber } = MONTH;
  return Number(month) >= startNumber && Number(month) <= endNumber;
};

export const validateDate = (value: string, name: string) => {
  const currentDate = new Date();

  if (name === 'year') return value === '' || Number(value) + CENTURY_PREFIX >= currentDate.getFullYear();
  if (name === 'month') return value === '' || Number(value) >= currentDate.getMonth() + 1;
  return false;
};
