import { ProjectInput } from "../types";
import { RESET_FORM, UPDATE_FORM, UPDATE_RESPONSE } from "./actions";

interface State {
  formInputState: ProjectInput;
  response?: any;
}

type Action =
  | { type: typeof UPDATE_FORM; payload: ProjectInput }
  | { type: typeof RESET_FORM }
  | { type: typeof UPDATE_RESPONSE; payload: any };

const initialState: State = {
  formInputState: {
    idea: "",
    features: "",
    techStack: "",
    deadline: "",
  },
};

const formInputReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case UPDATE_FORM:
      return { ...state, formInputState: action.payload };
    case UPDATE_RESPONSE:
      const today = new Date();
      function formatDate(date:Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Iterate over tasks and convert daysRequired to dueDate
    const tasks = action.payload.tasks?.map((task:any) => {
        // Calculate the due date by adding daysRequired to today's date
        const dueDate = new Date(today);
        dueDate.setDate(dueDate.getDate() + task.daysRequired);
    
        // Return the updated task with dueDate instead of daysRequired
        return {
            ...task,
            dueDate: formatDate(dueDate)
        };
    });
      return {
        ...state,
        response: tasks,
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default formInputReducer;
