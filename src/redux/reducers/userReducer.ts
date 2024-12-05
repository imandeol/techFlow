import { UserState } from "../../types";
import { UserActionTypes, SET_USER_DETAILS } from "../actions";

const initialState: UserState = {
  user: null,
  teamId: null,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        user: action.payload.user,
        teamId: action.payload.teamId,
      };
    default:
      return state;
  }
};