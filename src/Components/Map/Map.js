import React, { Component } from "react";
import { Map, Marker, InfoWindow } from "google-maps-react";
import { connect } from "react-redux";
import {
  zoomMap,
  toggleMarkers,
  setCenter,
  currentMarkers
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
  _isMounted = false;
  state = {
    google: "",
    scrollwheel: false,
    disableDefaultUI: true,
    currentMarker: [],
    markersPosition: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    currentUserId: localStorage.getItem("userId"),
    markersCopy: [],
    dataBase: [],
    saveStatus: "Save Markers",
    toggleStatus: "No Markers"
  };
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
      currentMarker: keys,
      toggleStatus: "Turn Off Markers"
    });
  };
  zoomInMap = () => {
    this.props.zoomMap(true);
  };
  zoomOutMap = () => {
    this.props.zoomMap(false);
  };
  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  setMarker() {
    return Object.keys(this.state.markersPosition).map((pos, index) => {
      const marker = this.state.markersPosition[pos];
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
  turnOffOn = () => {
    if (this.props.toggle === false) {
      this.props.toggleMarkers(true);
      this.setState({
        markersPosition: [],
        toggleStatus: "Turn On Markers"
      });
    } else {
      this.props.toggleMarkers(false);
      this.setState({
        markersPosition: this.state.markersCopy,
        toggleStatus: "Turn Off Markers"
      });
    }
  };
  loadMarkers = () => {
    for (let item of this.state.dataBase) {
      if (item.userId === this.state.currentUserId) {
        let markers = item.geo.concat(this.state.markersPosition);
        this.setState({
          markersPosition: markers,
          markersCopy: markers,
          toggleStatus: "Turn Off Markers"
        });
        this.props.toggleMarkers(false);
      }
    }
  };
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
            geo: [this.state.markersPosition]
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
  update() {
    fetch("https://api.jsonbin.io/b/5bfaab94bd6fba76967fbddf", {
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
              icon: item.icon,
              rating: item.rating
            });
          }
          this.setState({
            markersPosition: requestedData
          });
        })
      );
    }
  };
  componentDidMount() {
    if (this.state.markersPosition.length <= 0 && this.props.markers !== "") {
      this.setState({
        markersPosition: this.state.markersPosition.concat(this.props.markers)
      });
    }
    this._isMounted = true;
    fetch("https://api.jsonbin.io/b/5bfaab94bd6fba76967fbddf/latest", {
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
  componentWillUnmount() {
    this.props.currentMarkers(this.state.markersPosition);
    this._isMounted = false;
  }
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
          <MDBRow center>
            <MDBBtn color="mdb-color" onClick={this.zoomInMap}>
              ZoomIn
            </MDBBtn>
            <MDBBtn color="mdb-color" onClick={this.zoomOutMap}>
              ZoomOut
            </MDBBtn>
            <MDBBtn color="mdb-color" onClick={this.turnOffOn}>
              {this.state.toggleStatus}
            </MDBBtn>
            <MDBBtn color="mdb-color" onClick={this.loadMarkers}>
              Load Markers
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
    currentMarkers: markers => dispatch(currentMarkers(markers))
  };
}
function mapStateToProps(state) {
  return {
    zoom: state.zoom.zoom,
    toggle: state.toggle.toggleMarkers,
    currentCenter: state.center.center,
    markers: state.markers.markers
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
