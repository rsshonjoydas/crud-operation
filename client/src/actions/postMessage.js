import api from './api';

// ! action types
export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL',
};

// ! get request
export const fetchAll = () => (dispatch) => {
  api
    .postMessage()
    .fetchAll()
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// ! create post
export const create = (data, onSuccess) => (dispatch) => {
  api
    .postMessage()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

// ! update post
export const update = (id, data, onSuccess) => (dispatch) => {
  api
    .postMessage()
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

// ! delete post
export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .postMessage()
    .delete(id)
    .then(() => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
