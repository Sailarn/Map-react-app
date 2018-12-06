import {MAP_ZOOMIN, MAP_ZOOMOUT} from '../actions/actionTypes'

const initialState = {
    zoom: 15
}
export default function zoomReducer(state = initialState, action) {
    switch (action.type) {
      case MAP_ZOOMIN:
        return {
          ...state,
          zoom: state.zoom + 1
        };
      case MAP_ZOOMOUT:
        return {
          ...state,
          zoom: state.zoom - 1
        };
      default:
        return state;
    }
  }