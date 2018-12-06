import { SET_CENTER} from "../actions/actionTypes";

const initialState = {
  center: { lat: 46.482753, lng: 30.735552 }
};
export default function centerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CENTER:
      return {
        ...state,
        center: action.center
      };
    default:
      return state;
  }
}