import {
  RELOAD_TASK_LIST,
  FETCH_SELECTED_TASK,
  SET_IS_EDIT,
  SET_TASK_FORM_VISIBLITY,
} from "../actions/actionTypes";

export default function taskFormReducer(
  state = {
    isEdit: false,
    selectedTask: undefined,
    reloadTaskList: false,
    taskFormVisible: false,
  },
  action
) {
  switch (action.type) {
    case RELOAD_TASK_LIST:
      state = { ...state, reloadTaskList: !state.reloadTaskList };
      break;
    case FETCH_SELECTED_TASK:
      state = { ...state, selectedTask: action.data };
      break;

    case SET_IS_EDIT:
      state = { ...state, isEdit: action.data };
      break;

    case SET_TASK_FORM_VISIBLITY:
      state = { ...state, taskFormVisible: action.data };

    default:
      state = { ...state };
  }
  return state;
}
