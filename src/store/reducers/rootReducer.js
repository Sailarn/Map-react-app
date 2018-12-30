import {combineReducers} from 'redux'
import authReducer from './auth'
import zoomReducer from './zoom'
import toggleReducer from './toggle'
import centerReducer from './center'
import markersReducer from './markers'
import loadedReducer from './loadedStatus'

export default combineReducers({
    auth: authReducer,
    zoom: zoomReducer,
    toggle: toggleReducer,
    center: centerReducer,
    markers: markersReducer,
    loaded: loadedReducer
})