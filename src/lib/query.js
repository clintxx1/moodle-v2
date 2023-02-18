import axios from "axios";

export const getCollections = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/collection`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getCollectionDetails = ({ id }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/collection/details?id=` + id)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
