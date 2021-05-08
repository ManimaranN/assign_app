import Axios from "./Axios";

export const login = () => {
  const payload = { email: "smithcheryl@yahoo.com", password: "12345678" };

  return Axios({
    url: "https://stage.api.sloovi.com/login",
    method: "POST",
    data: payload,
  });
};

export const fetchUserId = () => {
  return Axios({
    url: `https://stage.api.sloovi.com/user`,
    method: "GET",
    data: {},
  });
};

export const fetchTaskList = () => {
  return Axios({
    method: "GET",
  });
};

export const createNewTask = (payload) => {
  return Axios({
    method: "POST",
    data: payload,
  });
};

export const updateTask = (payload, task_id) => {
  return Axios({
    url: `/${task_id}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteTask = (task_id) => {
  return Axios({
    url: `https://stage.api.sloovi.com/task/lead_58be137bfde045e7a0c8d107783c4598/${task_id}`,
    method: "DELETE",
  });
};
