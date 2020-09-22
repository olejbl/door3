import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getDoorsByProducer = (producer) => {
  return api.get(`https://res.cloudinary.com/dikc1xnkv/image/list/${producer}.json`);
}

const apis = {
  getDoorsByProducer,
};

export default apis;