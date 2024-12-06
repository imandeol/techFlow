const SET_WORKFLOW_STATES = "SET_WORKFLOW_STATES";

export const setWorkflowStates = (workflowStates: any) => ({
  type: SET_WORKFLOW_STATES,
  payload: workflowStates,
});

const initialState = {
  workflowStates: [],
};

const workflowReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_WORKFLOW_STATES:
      return {
        ...state,
        workflowStates: action.payload,
      };
    default:
      return state;
  }
};

export default workflowReducer;
