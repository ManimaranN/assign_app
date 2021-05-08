import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Card, Typography, Spin } from "antd";

import { setTaskFormVisiblity } from "../reduxStore/actions/taskFormActions";
import { fetchTaskList } from "../apiActions";

import TaskForm from "./TaskForm";
import EachTask from "./EachTask";

import "./board.css";
import EmptyIcon from "../svg/EmptyIcon";

const { Text } = Typography;
const Board = (props) => {
  const {
    setTaskFormVisiblity,
    taskFormVisible,
    reloadTaskList,
    isEdit,
  } = props;
  const [taskList, settaskList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const handleOpenTaskForm = () => {
    setTaskFormVisiblity(true);
  };

  const handleFetchTaskList = () => {
    setisLoading(true);
    fetchTaskList()
      .then((response) => {
        if (response?.status === 200) {
          if (response?.data?.status === "success") {
            console.log(
              "response for fetch task List:",
              response?.data?.results
            );
            settaskList(response?.data?.results);
          }
        }
      })
      .catch((err) => {
        //we can handle failure case here
      })
      .finally(() => {
        setisLoading(false);
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
        title={`Tasks ${taskList?.length}`}
        extra={
          <PlusOutlined
            className="add_task_icon"
            onClick={() => handleOpenTaskForm()}
          />
        }
        style={{ width: 380 }}
      >
        <Spin spinning={isLoading}>
          {taskFormVisible && !isEdit && <TaskForm />}
          {taskList?.length > 0
            ? taskList?.map((task) => {
                return <EachTask key={task.id} task={task} />;
              })
            : !taskFormVisible && (
                <div
                  onClick={() => handleOpenTaskForm()}
                  className="no_data_container"
                >
                  <EmptyIcon />
                  <Text strong>Add new task</Text>
                </div>
              )}
        </Spin>
      </Card>
    </div>
  );
};

const mapDispatchToProps = { setTaskFormVisiblity };
const mapStatesToProps = (state) => {
  return {
    taskFormVisible: state.taskFormReducer.taskFormVisible,
    reloadTaskList: state.taskFormReducer.reloadTaskList,
    isEdit: state.taskFormReducer.isEdit,
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(Board);
