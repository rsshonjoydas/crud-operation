import axios from 'axios';

const baseURL = 'http://localhost:5000/';

export default {
  postMessage(url = `${baseURL}postMessages/`) {
    return {
      fetchAll: () => axios.get(url),
      fetchById: (id) => axios.get(url + id),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  },
};
