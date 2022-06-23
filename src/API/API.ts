import axios from 'axios';

export const baseURL = 'https://ya-praktikum.tech/api/v2';
export const serverURL = 'https://local.ya-praktikum.tech:8080';

export const instance = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const server = axios.create({
  withCredentials: true,
  baseURL: serverURL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export const TEAM_NAME = 'defined';
export const RATING_FIELD_NAME = 'score';
