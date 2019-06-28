import React, {Component} from "react";
import {Map, Marker, InfoWindow} from "google-maps-react";
import {connect} from "react-redux";
import {
    setCenter,
    toggleMarkers,
    currentMarkers,
    setDatabase,
    setGoogleObject
} from "../../store/actions/map";
import Wrapper from "../../hoc/MapWrapper/MapWrapper";
import Panel from "./Panel";
import InfoDrawer from "./InfoDrawer"
import {
    MDBContainer
} from "mdbreact";
import "./Map.css";

class MapContainer extends Component {
    _isMounted = false; //во избежание ошибки leak memory
    state = {
        scrollwheel: false, //запрет на масштабирование колесиком
        dataBaseLoaded: false,
        disableDefaultUI: true, // убран стандартный UI
        markersPosition: [], // массив всех текущих маркеров
        showingInfoWindow: false, // состояние инфо окна маркера (вкл/выкл)
        activeMarker: {}, // активный маркер (для триггера инфо окна)
        selectedPlace: {} // инфо о выбранном маркере
    };
    // функция отвечающая за изменения на карте
    onMapChange = (props, l, c) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
        const keys = {
            lat: c.latLng.lat(),
            lng: c.latLng.lng(),
            type: 'custom',
            name: 'Marker'
        };
        const arr = this.state.markersPosition;
        arr.push(keys);
        this.setState({
            markersPosition: arr
        });
        const markers = this.props.markers.concat(keys);
        this.props.currentMarkers(markers);
        if (this.props.toggle) {
            this.props.toggleMarkers(false)
        }
    };
    // информация о маркере
    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    // установка маркера
    setMarker() {
        const markers = !this.props.toggle ? this.props.markers : [];
        return Object.keys(markers).map((pos, index) => {
            let marker = markers[pos];
            return (
                <Marker
                    onClick={this.onMarkerClick}
                    title={marker.name}
                    position={marker}
                    name={marker.name}
                    key={index}
                    icon={marker.icon}
                />
            );
        });
    }

    // как только компонент загрузился - загрузить базу
    componentDidMount() {
        this._isMounted = true;
        fetch("https://api.jsonbin.io/b/5c2957343f8bd92e4cc5fed1/latest", {
            method: "GET",
            headers: {"Content-type": "application/json"}
        })
            .then(response => response.json())
            .then(data => {
                if (this._isMounted) {
                    const base = data;
                    for(let item of base){
                        if(!item.userName){
                            item.userName = 'UserName';
                        }
                    }
                    this.setState({
                        dataBaseLoaded: true
                    });
                    this.props.setDatabase(base)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setMarker();
    }

    // сохранение маркеров в redux и переключение флага
    componentWillUnmount() {
        this.props.currentMarkers(this.props.copyMarkers);
        this._isMounted = false;
    }

    // отслеживание центра карты для точного отображения выбранных объектов
    centerMoved = (mapProps, map) => {
        const lat = map.center.lat();
        const lng = map.center.lng();
        const mapCenter = {lat: lat, lng: lng};
        this.props.setCenter(mapCenter);
    };
    render() {
        return (
            <MDBContainer fluid style={{padding: "0px"}}>
                <Panel/>
                <Wrapper>
                    <Map
                        onDragend={this.centerMoved}
                        disableDoubleClickZoom={true}
                        scrollwheel={false}
                        zoomControl={false}
                        scaleControl={false}
                        gestureHandling={"greedy"}
                        onReady={props => this.props.setGoogleObject(props.google)}
                        google={window.google}
                        zoom={this.props.zoom}
                        className={"map"}
                        initialCenter={this.props.currentCenter}
                        disableDefaultUI={true}
                        onClick={this.onMapChange}
                    >
                        {this.setMarker(this.props.markers)}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                        >
                            <div>
                                <h1>{this.state.selectedPlace.name}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                    <InfoDrawer/>
                </Wrapper>
            </MDBContainer>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCenter: center => dispatch(setCenter(center)),
        currentMarkers: markers => dispatch(currentMarkers(markers)),
        setDatabase: data => dispatch(setDatabase(data)),
        toggleMarkers: toggle => dispatch(toggleMarkers(toggle)),
        setGoogleObject: data => dispatch(setGoogleObject(data))
    };
}

function mapStateToProps(state) {
    return {
        zoom: state.map.zoom,
        toggle: state.map.toggleMarkers,
        currentCenter: state.map.center,
        markers: state.map.markers,
        loaded: state.map.loaded,
        copyMarkers: state.map.copyMarkers,
        dataBase: state.map.dataBase
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapContainer);
