import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Card } from "antd";

import { setTaskFormVisiblity } from "../reduxStore/actions/taskFormActions";
import { fetchTaskList } from "../apiActions";

import TaskForm from "./TaskForm";
import EachTask from "./EachTask";

import "./board.css";

const Board = (props) => {
  const { setTaskFormVisiblity, taskFormVisible, reloadTaskList } = props;
  const [taskList, settaskList] = useState();

  const handleOpenTaskForm = () => {
    setTaskFormVisiblity(true);
  };

  const handleFetchTaskList = () => {
    fetchTaskList().then((response) => {
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          console.log("response for fetch task List:", response?.data?.results);
          settaskList(response?.data?.results);
        }
      }
    });
  };

  useEffect(() => {
    handleFetchTaskList();
  }, [reloadTaskList]);

  return (
    <div className="wrapper_container">
      <Card
        hoverable
        size="small"
        title="Tasks 0"
        extra={
          <PlusOutlined
            className="add_task_icon"
            onClick={() => handleOpenTaskForm()}
          />
        }
        style={{ width: 380 }}
      >
        {taskList?.length > 0
          ? taskList?.map((task) => {
              return <EachTask key={task.id} task={task} />;
            })
          : "No data found"}
        {taskFormVisible && <TaskForm />}
      </Card>
    </div>
  );
};

const mapDispatchToProps = { setTaskFormVisiblity };
const mapStatesToProps = (state) => {
  return {
    taskFormVisible: state.taskFormReducer.taskFormVisible,
    reloadTaskList: state.taskFormReducer.reloadTaskList,
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(Board);
