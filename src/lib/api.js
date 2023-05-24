import axios from "axios";
import { dataHeader } from "./helper";

/**
 * START OF
 * CATEGORY
 * API
 */

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
  console.log("NAME: ", name);
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
/**END OF CATEGORY API */

/**
 *
 * START
 * OF
 * USERS API
 *
 * */

export const register = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, data, dataHeader())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, {
        params: { _id: data },
        ...dataHeader(),
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/user`, { data }, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user`, {
        data: { _id: data },
        ...dataHeader(),
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const fetchAllUsers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/fetchAllUsers`, {
        params: {},
        ...dataHeader(),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const checkIfAccountExist = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/checkEmail`, {
        params: data,
        ...dataHeader(),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const changePassword = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/changePassword`,
        data,
        dataHeader()
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**END OF USERS API */

/**
 *
 * START OF
 * RECORDS API
 *
 */
export const getRecord = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/currentRecord`, {
        params: data,
        ...dataHeader(),
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateRecord = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/record`, data, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const fetchAllRecords = (year) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/fetchAllStudents`, {
        params: year,
        ...dataHeader(),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const forceStartExam = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/triggerReviewDuration`,
        data,
        dataHeader()
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const fetchExamPercentage = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/fetchExamProgress`, {
        params: data,
        ...dataHeader(),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**END OF RECORDS API */

/**
 * START OF
 * QUESTIONS API
 */
export const getQuestions = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question`, {
        params: data,
        ...dataHeader(),
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createQuestion = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/question`, data, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateQuestion = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/question`, data, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteQuestion = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/question`, {
        data: data,
        ...dataHeader(),
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
/**END OF QUESTIONS API */

/**
 * START OF
 * EXAM API
 */
export const getExam = (data) => {
  let temp = {};
  if (data) temp = data;
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/exam`, {
        params: temp,
        ...dataHeader(),
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createExam = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/exam`, data, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateExam = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/exam`, { ...data }, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteExam = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/exam`, {
        data: data,
        ...dataHeader(),
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const attemptExam = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/exam/attempt`, data, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const submitExam = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/exam/submit`, data, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const checkExam = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/fetchExamProgress`, {
        params: data,
        ...dataHeader(),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**END OF EXAM API */

/**START OF NOTIFICATIONS API */
export const fetchNotifications = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/notifications`, {
        ...dataHeader(),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const approveUser = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/approveUser`,
        { _id: data },
        dataHeader()
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const approveAllUser = () => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/approveAllUsers`, {}, dataHeader())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const rejectAllUser = () => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/rejectAllUsers`, {
        ...dataHeader(),
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

/**END OF NOTIFICATIONS API */

/**START OF FORECAST API */
export const getForecast = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/forecast`, {
        params: id,
        ...dataHeader(),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getPassingRate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getPassingRate`, {
        params: {},
        ...dataHeader(),
      })
      .then((res) => {
        console.log(res)
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**END OF FORECAST API */
