import axios from 'axios';

export const baseURL = 'https://ya-praktikum.tech/api/v2';

export const instance = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const TEAM_NAME = 'defined';
export const RATING_FIELD_NAME = 'score';
