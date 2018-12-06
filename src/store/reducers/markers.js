import { CURRENT_MARKERS } from "../actions/actionTypes";

const initialState = {
  markers: ""
};
export default function markersReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_MARKERS:
      return {
        ...state,
        markers: action.markers
      };
    default:
      return state;
  }
}