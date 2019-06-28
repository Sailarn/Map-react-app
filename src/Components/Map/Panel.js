import React, {Component} from "react";
import {connect} from "react-redux";
import {
    zoomMap,
    toggleMarkers,
    currentMarkers,
    loadedStatus,
    setDatabase
} from "../../store/actions/map";
import {
    MDBBadge,
    MDBBtn,
    MDBContainer,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBRow
} from "mdbreact";

class Panel extends Component {
    state = {
        currentUserId: localStorage.getItem("userId"), // текущий id пользователя
        saveStatus: "Save Markers" // статус сохранения
    };

    // вкл/выкл показ маркеров
    turnOffOn = () => {
        if (this.props.toggle === false) {
            this.props.toggleMarkers(true);
        } else {
            this.props.toggleMarkers(false);
        }
    };
    // загрузка маркеров из базы
    loadMarkers = () => {
        if (this.props.loaded === false) {
            for (let item of this.props.dataBase) {
                if (
                    item.userId === this.state.currentUserId &&
                    item.geo !== this.props.markers
                ) {
                    let markers = item.geo.concat(this.props.markers);
                    this.props.currentMarkers(markers);
                    this.props.toggleMarkers(false);
                }
            }
        }
        this.props.loadedStatus(true);
    };
    // сохранение маркеров в локальный state и вызов функции отправки на сервер
    saveMarkers = () => {
        let data = this.props.dataBase;
        if (data.length <= 0) {
            data.push({
                userId: this.state.currentUserId,
                geo: this.props.markers,
                userName: 'UserName'
            });
            this.props.setDatabase(data);
            this.update();
            return;
        }
        if (data.length > 0) {
            for (let item of data) {
                if (item.userId === this.state.currentUserId) {
                    item.geo = this.props.markers;
                    this.update();
                    return;
                }
            }
            for (let item2 of data) {
                if (item2.userId !== this.state.currentUserId) {
                    data.push({
                        userId: this.state.currentUserId,
                        geo: this.props.markers
                    });
                    this.props.setDatabase(data);
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
            body: JSON.stringify(this.props.dataBase),
            headers: {"Content-type": "application/json"}
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
            .catch(function (error) {
                console.log(error);
            });
    }

    // выбор что отобразить на карте
    onChooseHandler = event => {
        let arr = [];
        if (event.target.value === "None" || event.target.value === undefined) {
            for (let item of this.props.markers) {
                if (item.type) {
                    arr.push(item);
                }
            }
            this.props.currentMarkers(arr);
        } else if (event.target.value !== "") {
            const google = this.props.google;
            const center = this.props.currentCenter;
            const map = new google.maps.Map("", {center: center});
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
                    for (let item of this.props.markers) {
                        if (item.type) {
                            arr.push(item);
                        }
                    }
                    arr = arr.concat(requestedData);
                    this.props.currentMarkers(arr);
                })
            );
        }
    };
    render() {
        return (
            <MDBContainer
                fluid
                style={{position: "absolute", zIndex: "100", padding: "0px"}}
            >
                <MDBRow center className="w-100">
                    <MDBBtn color="mdb-color" onClick={() => this.props.zoomMap(true)}>
                        ZoomIn
                    </MDBBtn>
                    <MDBBtn color="mdb-color" onClick={() => this.props.zoomMap(false)}>
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
                            style={{marginLeft: "5px", marginBottom: "5px"}}
                        >
                            {this.props.markers.length}
                        </MDBBadge>
                    </MDBBtn>
                    <MDBDropdown
                        style={{display: "inline-flex"}}
                        onClick={this.onChooseHandler}
                    >
                        <MDBDropdownToggle
                            caret
                            color="mdb-color"
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
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        zoomMap: zoom => dispatch(zoomMap(zoom)),
        toggleMarkers: toggle => dispatch(toggleMarkers(toggle)),
        currentMarkers: markers => dispatch(currentMarkers(markers)),
        loadedStatus: loaded => dispatch(loadedStatus(loaded)),
        setDatabase: data => dispatch(setDatabase(data))
    };
}

function mapStateToProps(state) {
    return {
        toggle: state.map.toggleMarkers,
        currentCenter: state.map.center,
        markers: state.map.markers,
        loaded: state.map.loaded,
        dataBase: state.map.dataBase,
        google: state.map.google
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Panel);
