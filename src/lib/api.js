import axios from "axios";
import { dataHeader } from "./helper";

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/category`, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateCategory = ({ id, name }) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/category`,
        { _id: id, name },
        dataHeader()
      )
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createCategory = ({ name }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/category`, { name }, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteCategory = ({ id }) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/category`, {
        data: { _id: id },
        ...dataHeader(),
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

// export const getCollectionDetails = ({ id }) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}/collection/details?id=` + id)
//       .then((res) => resolve(res))
//       .catch((err) => reject(err));
//   });
// };
