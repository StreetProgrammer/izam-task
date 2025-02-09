import axios from 'axios';
const apiRoot = "http://localhost:8081"
export const getMenu = () => {
    return axios
      .get(`${apiRoot}/nav`, {})
      .then((response) => response.data);
};

export const updateOrder = (id, from, to) => {
    return axios
      .post(`${apiRoot}/track`, {
        id, from, to
      })
      .then((response) => response.data);
};