import axios from 'axios';

const baseURL = 'https://prompt-ed.vercel.app/'

export const api = axios.create({
  baseURL,
});