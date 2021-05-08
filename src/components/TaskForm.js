import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Modal,
  Spin,
  notification,
} from "antd";
import { connect } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import TrashIcon from "../svg/TrashIcon";

import {
  setTaskFormVisiblity,
  handleReloadTaskList,
  handleSetIsEdit,
  handleFetchSelectedTask,
} from "../reduxStore/actions/taskFormActions";
import { createNewTask, deleteTask, updateTask } from "../apiActions";
import { formatInitialData } from "../utils/dataFormatter";

import "./taskForm.css";
const format = "HH:mm";
const confirmModal = Modal.confirm;
const TaskForm = (props) => {
  const {
    setTaskFormVisiblity,
    isEdit,
    selectedTask,
    handleReloadTaskList,
    handleSetIsEdit,
  } = props;
  const [form] = Form.useForm();

  const [isLoading, setisLoading] = useState(false);

  const userOptions = [
    {
      name: "Saravanan 23",
      user_id: "user_979f2358c7554c809d0d688943b8966b",
    },
  ];

  function disabledDate(current) {
    return current && current < moment().startOf("day");
  }

  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  const handleCancel = () => {
    setTaskFormVisiblity(false);
    handleSetIsEdit(false);
    handleFetchSelectedTask({});
    form.resetFields();
  };

  const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
      message: title,
      description: msg,
    });
  };

  const getTimezoneOffsetInSeconds = (currentDate) => {
    return -currentDate.getTimezoneOffset() * 60;
  };

  const handleEditTask = (payload) => {
    setisLoading(true);
    updateTask(payload, selectedTask?.id)
      .then((response) => {
        if (response?.status === 200) {
          if (response?.data?.status === "success") {
            openNotificationWithIcon(
              "success",
              "Success",
              response?.data?.message
            );
            handleReloadTaskList();
            handleSetIsEdit(false);
            form.resetFields();
            handleFetchSelectedTask({});
            setTaskFormVisiblity(false);
          }
        }
        //failure case can be handled here
      })
      .catch((err) => {
        //failure case can be handled here
      })
      .finally(() => setisLoading(false));
  };

  const handleAddTask = (payload) => {
    setisLoading(true);
    createNewTask(payload)
      .then((response) => {
        if (response?.status === 200) {
          if (response?.data?.status === "success") {
            openNotificationWithIcon(
              "success",
              "Success",
              response?.data?.message
            );
            handleReloadTaskList();
            handleSetIsEdit(false);
            form.resetFields();
            setTaskFormVisiblity(false);
          }
        }
        //failure case can be handled here
      })
      .catch((err) => {
        //failure case can be handled here
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const handleFinish = (values) => {
    let currentDate = new Date();
    let time_zone = getTimezoneOffsetInSeconds(currentDate);
    const payload = {
      ...values,
      assigned_user: "user_979f2358c7554c809d0d688943b8966b",
      task_date: moment(values.task_date).format(`YYYY-MM-DD`),
      task_time: moment(values.task_time).diff(
        moment().startOf("day"),
        "seconds"
      ),
      time_zone: time_zone,
      is_completed: 0,
    };

    console.log("add");
    isEdit ? handleEditTask(payload) : handleAddTask(payload);
  };

  const handleDeleteTask = () => {
    setisLoading(true);
    deleteTask(selectedTask?.id)
      .then((response) => {
        if (response?.status === 200) {
          if (response?.data?.status === "success") {
            openNotificationWithIcon(
              "success",
              "Success",
              response?.data?.message
            );
            handleReloadTaskList();
            handleSetIsEdit(false);
            handleFetchSelectedTask({});
            setTaskFormVisiblity(false);
            form.resetFields();
          }
        }
        //failure case can be handled here
      })
      .catch((err) => {
        //failure case can be handled here
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const handleConfirmDelete = () => {
    confirmModal({
      title: "Please confirm",
      className: "manage-category-confirm-modal",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to remove this task`,
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => handleDeleteTask(),
    });
  };
  useEffect(() => {
    if (isEdit && selectedTask) {
      form.setFieldsValue(formatInitialData(selectedTask));
    }
  }, [isEdit, selectedTask, form]);

  return (
    <Spin spinning={isLoading}>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        className="task_form_container"
      >
        <Form.Item
          label="Task Description"
          name="task_msg"
          rules={[
            {
              required: true,
              message: "Description is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="deadline_field">
          <Form.Item
            label="Date"
            name="task_date"
            rules={[
              {
                required: true,
                message: "Date is required!",
              },
            ]}
          >
            <DatePicker disabledDate={disabledDate} onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Time"
            name="task_time"
            rules={[
              {
                required: true,
                message: "Time is required!",
              },
            ]}
          >
            <TimePicker format={format} />
          </Form.Item>
        </div>

        <Form.Item name="assigned_user" label="Assign User">
          <Select defaultValue={"Saravanan 23"}>
            {userOptions?.map((user) => {
              return (
                <Option key={user.user_id} value={user.user_id}>
                  {user.name}
                </Option>
              );
            })}
          </Select>
          ,
        </Form.Item>

        <div className="task_form_actions_container">
          <div
            className="task_form_actions_container_left"
            onClick={() => isEdit && handleConfirmDelete()}
          >
            {isEdit && <TrashIcon />}
          </div>
          <div className="task_form_actions_container_right">
            <Form.Item>
              <Button type="text" onClick={() => handleCancel()}>
                Cancel
              </Button>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="submit_btn">
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Spin>
  );
};

const mapDispatchToProps = {
  setTaskFormVisiblity,
  handleReloadTaskList,
  handleSetIsEdit,
  handleFetchSelectedTask,
};
const mapStatesToProps = (state) => {
  return {
    taskFormVisible: state.taskFormReducer.taskFormVisible,
    isEdit: state.taskFormReducer.isEdit,
    selectedTask: state.taskFormReducer.selectedTask,
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(TaskForm);
