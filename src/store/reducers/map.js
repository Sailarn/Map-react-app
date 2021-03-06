import {
    SET_CENTER,
    LOADED_STATUS,
    CURRENT_MARKERS,
    TOGGLE_MARKERS,
    MAP_ZOOMIN,
    MAP_ZOOMOUT,
    DATABASE,
    GOOGLE
} from "../actions/actionTypes";

const initialState = {
    center: {lat: 46.482753, lng: 30.735552},
    loaded: false,
    loadStatus: "Load Markers",
    markers: [],
    dataBase: [],
    google: "",
    copyMarkers: [],
    toggleMarkers: false,
    zoom: 15
};
export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case GOOGLE:
            return{
                ...state,
                google: action.data
            };
        case DATABASE:
            return{
                ...state,
                dataBase: action.data
            };
        case SET_CENTER:
            return {
                ...state,
                center: action.center
            };
        case LOADED_STATUS:
            return {
                ...state,
                loaded: action.status
            };
        case CURRENT_MARKERS:
            return {
                ...state,
                markers: action.markers,
                copyMarkers: action.markers
            };
        case TOGGLE_MARKERS:
            return {
                ...state,
                toggleMarkers: action.toggle
            };
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
