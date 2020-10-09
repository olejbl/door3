import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

//get doors by tag - the json is created by using tags 
export const getDoorsByProducer = (producer) => {
  return api.get(`https://res.cloudinary.com/dikc1xnkv/image/list/${producer}.json`);
}

const apis = {
  getDoorsByProducer,
};

export default apis;