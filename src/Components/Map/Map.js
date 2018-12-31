import React, { Component } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import { connect } from "react-redux";
import {
  zoomMap,
  toggleMarkers,
  setCenter,
  currentMarkers,
  loadedMarkersStatus
} from "../../store/actions/map";
import Wrapper from "../../hoc/MapWrapper/MapWrapper";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge
} from "mdbreact";
import "./Map.css";

class MapContainer extends Component {
  _isMounted = false; //во избежание ошибки leak memory
  state = {
    google: "", //ссылка на this.props.google ибо карта обернута в еще один hoc и нет возможности достать его обычным путем
    scrollwheel: false, //запрет на масштабирование колесиком
    disableDefaultUI: true, // убран стандартный UI
    currentMarker: [], // текущий маркер
    markersPosition: [], // массив всех текущих маркеров
    showingInfoWindow: false, // состояние инфо окна маркера (вкл/выкл)
    activeMarker: {}, // активный маркер (для триггера инфо окна)
    selectedPlace: {}, // инфо о выбранном маркере
    currentUserId: localStorage.getItem("userId"), // текущий id пользователя
    markersCopy: [], // копия массива с текущими маркерами
    dataBase: [], // маленькая база данных 
    saveStatus: "Save Markers" // статус сохранения
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
      lng: c.latLng.lng()
    };
    const copy = this.state.markersPosition;
    copy.push(keys);
    this.setState({
      markersPosition: copy,
      markersCopy: copy,
      currentMarker: keys
    });
  };
  // приближение (redux)
  zoomInMap = () => {
    this.props.zoomMap(true);
  };
  // отдаление (redux)
  zoomOutMap = () => {
    this.props.zoomMap(false);
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
    return Object.keys(this.state.markersPosition).map((pos, index) => {
      let marker = this.state.markersPosition[pos];
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
  // вкл/выкл показ маркеров
  turnOffOn = () => {
    if (this.props.toggle === false) {
      this.props.toggleMarkers(true);
      this.setState({
        markersPosition: []
      });
    } else {
      this.props.toggleMarkers(false);
      this.setState({
        markersPosition: this.state.markersCopy
      });
    }
  };
  // загрузка маркеров из базы
  loadMarkers = () => {
    if (this.props.loaded === false) {
      for (let item of this.state.dataBase) {
        if (
          item.userId === this.state.currentUserId &&
          item.geo !== this.state.markersPosition
        ) {
          let markers = item.geo.concat(this.state.markersPosition);
          this.setState({
            markersPosition: markers,
            markersCopy: markers
          });
          this.props.toggleMarkers(false);
        }
      }
    }
    this.props.loadedMarkersStatus(true);
  };
  // сохранение маркеров в локальный state и вызов функции отправки на сервер
  saveMarkers = () => {
    let data = this.state.dataBase;
    if (data.length <= 0) {
      data.push({
        userId: this.state.currentUserId,
        geo: this.state.markersPosition
      });
      this.setState({
        dataBase: data
      });
      this.update();
      return;
    }
    if (data.length > 0) {
      for (let item of data) {
        if (item.userId === this.state.currentUserId) {
          item.geo = this.state.markersPosition;
          this.update();
          return;
        }
      }
      for (let item2 of data) {
        if (item2.userId !== this.state.currentUserId) {
          data.push({
            userId: this.state.currentUserId,
            geo: this.state.markersPosition
          });
          this.setState({
            dataBase: data
          });
          this.update();
          return;
        }
      }
    }
  };
  // отправка на сервер
  update() {
    fetch("https://api.jsonbin.io/b/5c2957343f8bd92e4cc5fed1", {
      method: "PUT",
      body: JSON.stringify(this.state.dataBase),
      headers: { "Content-type": "application/json" }
    })
      .then(response => {
        if (response.status > 200) {
          this.setState({
            saveStatus: "Saving..."
          });
        } else if (response.status === 200) {
          this.setState({
            saveStatus: "Markers Saved"
          });
          setTimeout(() => {
            this.setState({
              saveStatus: "Save Markers"
            });
          }, 1000);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  // выбор что отобразить на карте
  onChooseHandler = event => {
    if (event.target.value === "None" || event.target.value === undefined) {
      this.setState({
        markersPosition: ""
      });
    } else if (event.target.value !== "") {
      const google = this.state.google;
      const center = this.props.currentCenter;
      const map = new google.maps.Map("", { center: center });
      const request = {
        location: center,
        radius: "1000",
        type: event.target.value
      };
      const requestedData = [];
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        request,
        (this.results = res => {
          for (let item of res) {
            requestedData.push({
              lat: item.geometry.location.lat(),
              lng: item.geometry.location.lng(),
              name: item.name,
              rating: item.rating,
              icon:
                "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png"
            });
          }
          this.setState({
            markersPosition: requestedData
          });
        })
      );
    }
  };
  // как только компонент загрузился - загрузить базу
  componentDidMount() {
    if (this.state.markersPosition.length <= 0 && this.props.markers !== "") {
      this.setState({
        markersCopy: this.state.markersPosition.concat(this.props.markers)
      });
      if (this.props.toggle === false) {
        this.setState({
          markersPosition: this.state.markersPosition.concat(this.props.markers)
        });
      }
    }
    this._isMounted = true;
    fetch("https://api.jsonbin.io/b/5c2957343f8bd92e4cc5fed1/latest", {
      method: "GET",
      headers: { "Content-type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            dataBase: data
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setMarker();
  }
  // сохранение маркеров в redux и переключение флага
  componentWillUnmount() {
    this.props.currentMarkers(this.state.markersCopy);
    this._isMounted = false;
  }
  // отслеживание центра карты для точного отображения выбранных объектов
  centerMoved = (mapProps, map) => {
    const lat = map.center.lat();
    const lng = map.center.lng();
    const mapCenter = { lat: lat, lng: lng };
    this.props.setCenter(mapCenter);
  };
  render() {
    return (
      <MDBContainer fluid style={{ padding: "0px" }}>
        <MDBContainer
          fluid
          style={{ position: "absolute", zIndex: "100", padding: "0px" }}
        >
          <MDBRow center className="w-100">
            <MDBBtn color="mdb-color" onClick={this.zoomInMap}>
              ZoomIn
            </MDBBtn>
            <MDBBtn color="mdb-color" onClick={this.zoomOutMap}>
              ZoomOut
            </MDBBtn>
            <MDBBtn color="mdb-color" onClick={this.turnOffOn}>
              {this.props.toggle === false
                ? "Turn Off Markers"
                : "Turn On Markers"}
            </MDBBtn>
            <MDBBtn color="mdb-color" onClick={this.loadMarkers}>
              {this.props.loaded === false ? "Load Markers" : "Loaded"}
            </MDBBtn>
            <MDBBtn color="mdb-color" onClick={this.saveMarkers}>
              {this.state.saveStatus}
              <MDBBadge
                color="info"
                pill
                style={{ marginLeft: "5px", marginBottom: "5px" }}
              >
                {this.state.markersPosition.length}
              </MDBBadge>
            </MDBBtn>
            <MDBDropdown
              style={{ display: "inline-flex" }}
              onClick={this.onChooseHandler}
            >
              <MDBDropdownToggle
                caret
                color="mdb-color"
                defaultValue={this.state.currentSelected}
              >
                Select type
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem value="None">None</MDBDropdownItem>
                <MDBDropdownItem value="gas_station">
                  Gas stations
                </MDBDropdownItem>
                <MDBDropdownItem value="pharmacy">Pharmacies</MDBDropdownItem>
                <MDBDropdownItem value="school">Schools</MDBDropdownItem>
                <MDBDropdownItem value="restaurant">
                  Restaurants
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBRow>
        </MDBContainer>
        <Wrapper>
          <Map
            onDragend={this.centerMoved}
            disableDoubleClickZoom={true}
            scrollwheel={false}
            zoomControl={false}
            scaleControl={false}
            gestureHandling={"greedy"}
            onReady={props =>
              this.setState({
                google: props.google
              })
            }
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
        </Wrapper>
      </MDBContainer>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    zoomMap: zoom => dispatch(zoomMap(zoom)),
    toggleMarkers: toggle => dispatch(toggleMarkers(toggle)),
    setCenter: center => dispatch(setCenter(center)),
    currentMarkers: markers => dispatch(currentMarkers(markers)),
    loadedMarkersStatus: loaded => dispatch(loadedMarkersStatus(loaded))
  };
}
function mapStateToProps(state) {
  return {
    zoom: state.zoom.zoom,
    toggle: state.toggle.toggleMarkers,
    currentCenter: state.center.center,
    markers: state.markers.markers,
    loaded: state.loaded.loaded,
    loadStatus: state.loaded.loadStatus
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
