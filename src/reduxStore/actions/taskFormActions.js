import {
  SET_TASK_FORM_VISIBLITY,
  RELOAD_TASK_LIST,
  FETCH_SELECTED_TASK,
  SET_IS_EDIT,
} from "./actionTypes";

export const handleReloadTaskList = (data) => {
  return {
    type: RELOAD_TASK_LIST,
    data,
  };
};

export const handleFetchSelectedTask = (data) => {
  return {
    type: FETCH_SELECTED_TASK,
    data,
  };
};

export const handleSetIsEdit = (data) => {
  return {
    type: SET_IS_EDIT,
    data,
  };
};

export const setTaskFormVisiblity = (data) => {
  return { type: SET_TASK_FORM_VISIBLITY, data };
};
