import { ANTHENTICATE, LOGOUT } from "../actions/types";

const initialState = {
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ANTHENTICATE:
      return {
        ...state,
        user: action.payload
      };
      break;

    case LOGOUT:
      return {
        ...state,
        user: action.payload
      };
      break;
    default:
      return state;
  }
}
