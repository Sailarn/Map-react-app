import { LOADED_STATUS} from "../actions/actionTypes";

const initialState = {
  loaded: false,
  loadStatus: 'Load Markers'
};
export default function loadedReducer(state = initialState, action) {
  switch (action.type) {
    case LOADED_STATUS:
      return {
        ...state,
        loaded: action.status,
        loadStatus: 'Loaded'
      };
    default:
      return state;
  }
}