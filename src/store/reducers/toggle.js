import { MARKERS_ON, MARKERS_OFF } from "../actions/actionTypes";

const initialState = {
  toggleMarkers: false
};
export default function toggleReducer(state = initialState, action) {
  switch (action.type) {
    case MARKERS_ON:
      return {
        ...state,
        toggleMarkers: true
      };
    case MARKERS_OFF:
      return {
        ...state,
        toggleMarkers: false
      };
    default:
      return state;
  }
}
