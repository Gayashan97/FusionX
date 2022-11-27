import axios from 'axios';
import { baseURL } from './Constants';

export const get = path =>
  axios
    .get(`${baseURL}${path}`)
    .then(res => {
      return res;
    })
    .catch(error => error);

export const put = (path, payload, headers) =>
  axios({
    url: `${baseURL}${path}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    data: payload
  })

export const post = (path, payload) =>
  axios({
    url: `${baseURL}${path}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: payload
  })
    .then(res => {
      return res;
    })
    .catch(error => {
      return Promise.reject(error)
    });

export const getById = (path, payload) => {
  return axios
    .get(`${baseURL}${path}/${payload}`)
    .then(res => {
      return res;
    })
    .catch(error => {
      throw new Error(error);
    });
};

export const deleteItem = (path) => {
    return axios
        .delete(`${baseURL}${path}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            throw new Error(error);
        });
};