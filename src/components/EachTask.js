import React, { Fragment } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import SnoozeIcon from "../svg/SnoozeIcon";
import TickIcon from "../svg/TickIcon";
import EditIcon from "../svg/EditIcon";

import {
  setTaskFormVisiblity,
  handleFetchSelectedTask,
  handleSetIsEdit,
} from "../reduxStore/actions/taskFormActions";

import "./eachTask.css";
import TaskForm from "./TaskForm";

const { Text } = Typography;
const EachTask = (props) => {
  const {
    task,
    handleFetchSelectedTask,
    handleSetIsEdit,
    setTaskFormVisiblity,
    selectedTask,
    isEdit,
  } = props;

  const handleEditTask = (task) => {
    handleFetchSelectedTask(task);
    handleSetIsEdit(true);
    setTaskFormVisiblity(true);
    console.log("edit called");
  };
  return (
    <Fragment>
      {selectedTask === task && isEdit ? (
        <TaskForm />
      ) : (
        <div className="each_task_container">
          <div className="eachTask_left_main">
            <Avatar
              shape="square"
              src={task?.user_icon}
              size={44}
              icon={<UserOutlined />}
            />
            <div className="each_task_left_details">
              <Text strong>{task?.task_msg}</Text>
              <Text>{moment(task?.task_date).format(`DD/MM/YYYY`)}</Text>
            </div>
          </div>
          <div className="eachTask_right_main">
            <div
              className="eachTask_edit_icon"
              onClick={() => handleEditTask(task)}
            >
              <EditIcon />
            </div>
            <div className="eachTask_right_icon_left">
              <SnoozeIcon />
            </div>
            <div className="eachTask_right_icon_right">
              <TickIcon />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapDispatchToProps = {
  setTaskFormVisiblity,
  handleFetchSelectedTask,
  handleSetIsEdit,
};
const mapStatesToProps = (state) => {
  return {
    taskFormVisible: state.taskFormReducer.taskFormVisible,
    selectedTask: state.taskFormReducer.selectedTask,
    isEdit: state.taskFormReducer.isEdit,
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(EachTask);
