import {
  MAP_ZOOMIN,
  MAP_ZOOMOUT,
  MARKERS_ON,
  MARKERS_OFF,
  SET_CENTER,
  CURRENT_MARKERS
} from "./actionTypes";

export function zoomMap(zoomMap) {
  return dispatch => {
    if (zoomMap === true) {
      dispatch(zoomIn());
    } else {
      dispatch(zoomOut());
    }
  };
}
export function toggleMarkers(toggleMarkers) {
  return dispatch => {
    if (toggleMarkers === true) {
      dispatch(toggleOn());
    } else {
      dispatch(toggleOff());
    }
  };
}
export function setCenter(center) {
  return dispatch => {
    dispatch(currentCenter(center));
  };
}
export function currentMarkers(markers){
  return dispatch => {
    dispatch(setMarkers(markers));
  }
}


export function setMarkers(markers){
  return{
    type: CURRENT_MARKERS,
    markers
  }
}
export function currentCenter(center){
  return{
    type: SET_CENTER,
    center
  }
}
export function zoomIn() {
  return {
    type: MAP_ZOOMIN
  };
}
export function zoomOut() {
  return {
    type: MAP_ZOOMOUT
  };
}
export function toggleOn() {
  return {
    type: MARKERS_ON
  };
}
export function toggleOff() {
  return {
    type: MARKERS_OFF
  };
}
