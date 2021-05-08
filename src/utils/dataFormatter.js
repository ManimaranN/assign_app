import moment from "moment";
export const formatInitialData = (rawData) => {
  console.log("raw data :", rawData);

  let intialData = {
    task_msg: rawData.task_msg,
    task_date: moment(rawData.task_date),
    task_time: moment(rawData.task_time),
    assigned_user: rawData.assigned_user,
  };

  return intialData;
};
