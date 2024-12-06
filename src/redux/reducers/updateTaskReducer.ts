export const UPDATE_TASK_SUCCESS = "UPDATE TASK SUCCESS";

export const updateTaskSuccess = (
  success: boolean
): UpdateTaskSuccessAction => ({
  type: UPDATE_TASK_SUCCESS,
  payload: success,
});

interface UpdateTaskState {
  success: boolean;
}

const initialState: UpdateTaskState = {
  success: false,
};

type UpdateTaskSuccessAction = {
  type: string;
  payload: boolean;
};

const updateTaskReducer = (
  state = initialState,
  action: UpdateTaskSuccessAction
): UpdateTaskState => {
  switch (action.type) {
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
};

export default updateTaskReducer;
