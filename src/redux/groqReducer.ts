import { RESET_RESPONSE, UPDATE_RESPONSE } from "./actions";

interface groqResponseState {
  data: any;
}

type groqAction =
  | { type: typeof UPDATE_RESPONSE; payload: any }
  | { type: typeof RESET_RESPONSE };

const initialState: groqResponseState = {
  data: null,
};

const groqResponseReducer = (
  state: groqResponseState = initialState,
  action: groqAction
): groqResponseState => {
  switch (action.type) {
    case UPDATE_RESPONSE:
      const today = new Date();
      function formatDate(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      const tasks = action.payload.tasks?.map((task: any) => {
        const dueDate = new Date(today);
        dueDate.setDate(dueDate.getDate() + task.daysRequired);

        return {
          ...task,
          dueDate: formatDate(dueDate),
        };
      });
      return {
        ...state,
        data: tasks,
      };
    case RESET_RESPONSE:
      return initialState;
    default:
      return state;
  }
};

export default groqResponseReducer;
