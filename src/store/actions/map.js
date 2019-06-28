import {
    MAP_ZOOMIN,
    MAP_ZOOMOUT,
    SET_CENTER,
    CURRENT_MARKERS,
    LOADED_STATUS,
    TOGGLE_MARKERS,
    DATABASE,
    GOOGLE
} from "./actionTypes";

export function setGoogleObject(data) {
    return {
        type: GOOGLE,
        data
    }
}

export function setDatabase(data) {
    return{
        type: DATABASE,
        data
    }
}

export function setCenter(center) {
    return {
        type: SET_CENTER,
        center
    };
}

export function toggleMarkers(toggle) {
    return {
        type: TOGGLE_MARKERS,
        toggle
    };
}

export function currentMarkers(markers) {
    return {
        type: CURRENT_MARKERS,
        markers
    };
}

export function loadedStatus(status) {
    return {
        type: LOADED_STATUS,
        status
    }
}

export function zoomMap(zoom) {
    return dispatch => {
        if (zoom === true) {
            dispatch(zoomIn());
        } else {
            dispatch(zoomOut());
        }
    };
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

