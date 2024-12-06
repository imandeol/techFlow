interface TeamState {
  members: Array<{
    id: string;
    name: string;
    email: string;
  }>;
}

const initialState: TeamState = {
  members: [],
};

const SET_TEAM_MEMBERS = "SET_TEAM_MEMBERS";
const CLEAR_TEAM_MEMBERS = "CLEAR_TEAM_MEMBERS";

export const setTeamMembers = (members: TeamState["members"]) => ({
  type: SET_TEAM_MEMBERS,
  payload: members,
});

export const clearTeamMembers = () => ({
  type: CLEAR_TEAM_MEMBERS,
});

export const teamReducer = (
  state: TeamState = initialState,
  action: { type: string; payload?: any }
): TeamState => {
  switch (action.type) {
    case SET_TEAM_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    case CLEAR_TEAM_MEMBERS:
      return {
        ...state,
        members: [],
      };
    default:
      return state;
  }
};
