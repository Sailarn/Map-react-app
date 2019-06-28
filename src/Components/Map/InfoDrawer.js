import React, {Component} from "react";
import {
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBBtn
} from "mdbreact";
import {connect} from "react-redux";
import {
    currentMarkers,
    loadedStatus,
    setDatabase
} from "../../store/actions/map";

class InfoDrawer extends Component {
    state = {
        toggle: false,
        update: false,
        renamePlace: '',
        disableInput: true,
        renameMarkerIndex: 0,
        nameValue: '',
        nameChange: false,
        currentMarker: {}
    };
    toggleInfo = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    };
    toggleRenameMarker = index => {
        this.setState({
            disableInput: false,
            renamePlace: this.props.markers[index].name,
            renameMarkerIndex: index
        });
    };
    handleInput = e => {
        this.setState({
            renamePlace: e.target.value
        })
    };
    renameMarker = (e) => {
        const copy = this.props.markers;
        Object.assign(copy[this.state.renameMarkerIndex], {
            name: this.state.renamePlace
        });
        this.props.currentMarkers(copy.map((item) => item));
        this.setState({
            disableInput: true,
            renamePlace: '',
            renameMarkerIndex: 0
        })
    };
    deleteMarker = (index) => {
        let copy = this.props.markers;
        let marker = copy.splice(index, 1);
        this.props.currentMarkers(copy.filter((item) => item !== marker));
    };
    lightMarker = (marker, index) => {
        for (let item of this.props.markers) {
            if (item.icon && item.type) {
                delete item.icon;
            }
            if (!item.type) {
                item.icon = 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png';
            }
        }
        const copy = this.props.markers;
        if (copy[index] === this.state.currentMarker) {
            this.setState({
                currentMarker: {}
            });
            if (!copy[index].type) {
                copy[index].icon = 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png';
            } else {
                delete copy[index].icon;
            }
            return this.props.currentMarkers(copy.map((item) => item));
        }
        Object.assign(copy[index], {
            icon: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/64/Map-Marker-Marker-Outside-Pink.png'
        });
        this.setState({
            currentMarker: copy[index]
        });
        this.props.currentMarkers(copy.map((item) => item));
    };
    renderMarkers = () => {
        const markers = this.props.markers;
        return Object.keys(markers).map((pos, index) => {
            let marker = markers[pos];
            if (markers.length > 0) {
                return (
                    <MDBListGroupItem
                        className={this.state.currentMarker === marker ? 'list-item chosen-item' : 'list-item'}
                        key={index}>
                        <p onClick={() => this.lightMarker(marker, index)}>{marker.name}</p>
                        <div>
                            {marker.type ? <MDBIcon className={'icon'} onClick={() => this.toggleRenameMarker(index)}
                                                    icon="edit"/> : false}
                            <MDBIcon className={'icon'} onClick={() => this.deleteMarker(index)} icon="trash"/>
                        </div>
                    </MDBListGroupItem>
                );
            }
        });
    };
    userName = () => {
        for (let item of this.props.dataBase) {
            if (item.userId === localStorage.getItem("userId")) {
                return item.userName
            }
        }
        return 'UserName';
    };
    inputName = e => {
        this.setState({
            nameValue: e.target.value
        })
    };
    changeName = () => {
        let data = this.props.dataBase;
        for (let item of data) {
            if (item.userId === localStorage.getItem("userId")) {
                item.userName = this.state.nameValue;
                return this.setState({
                    nameValue: '',
                    nameChange: false
                })
            }
        }
        for (let item of data) {
            if (item.userId !== localStorage.getItem("userId")) {
                data.push({
                    userId: localStorage.getItem("userId"),
                    geo: this.props.markers,
                    userName: this.state.nameValue
                });
                this.props.setDatabase(data);
                return this.setState({
                    nameValue: '',
                    nameChange: false
                })
            }
        }
    };
    toggleInputName = () => {
        for (let item of this.props.dataBase) {
            if (item.userId === localStorage.getItem("userId")) {
                return this.setState({
                    nameChange: true,
                    nameValue: item.userName
                })
            }
        }
        return this.setState({
            nameChange: true,
            nameValue: 'UserName'
        })
    };
    burnThemAll = () => {
        this.props.currentMarkers([]);
        this.props.loadedStatus(false);
    };

    render() {
        return (
            <div className={this.state.toggle ? 'user-info' : 'user-info closed'}>
                <MDBBtn size="sm" gradient="blue" className={'open-close-info'} onClick={this.toggleInfo}>
                    {!this.state.toggle ? 'Open Info' : 'Close Info'}</MDBBtn>
                <div className={'user-info-wrapper'}>
                    <div>
                        <div className={'account-name'}>Account Name: {this.userName()} <MDBIcon
                            onClick={this.toggleInputName}
                            icon="edit"/></div>
                        {this.state.nameChange ?
                            <div className={'input-block'}>
                                <MDBInput
                                    label='Account Name'
                                    value={this.state.nameValue}
                                    onInput={this.inputName}/>
                                <button className={'icon-btn'}>
                                    <MDBIcon onClick={this.changeName}
                                             icon="check"/>
                                </button>
                            </div> : false
                        }
                        {!this.state.disableInput ?
                            <div className={'input-block'}>
                                <MDBInput label='Marker Name' value={this.state.renamePlace}
                                          onInput={this.handleInput}/>
                                <button className={'icon-btn'}>
                                    <MDBIcon onClick={this.renameMarker} icon="check"/>
                                </button>
                            </div> : false
                        }
                    </div>
                    <div className={'user-items-block'}>
                        {this.props.markers.length > 0 ?
                            <div>
                                <MDBListGroup className='user-list scrollbar scrollbar-black bordered-black square'>
                                    {this.renderMarkers()}
                                </MDBListGroup>
                                <MDBBtn className={'delete-btn'} onClick={this.burnThemAll} color="danger" size="sm">Delete
                                    all
                                    markers</MDBBtn>
                            </div> :
                            <p className='user-list'>There's no markers yet</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        currentMarkers: markers => dispatch(currentMarkers(markers)),
        loadedStatus: (status) => dispatch(loadedStatus(status)),
        setDatabase: (data) => dispatch(setDatabase(data))
    };
}

function mapStateToProps(state) {
    return {
        zoom: state.map.zoom,
        toggle: state.map.toggleMarkers,
        currentCenter: state.map.center,
        markers: state.map.markers,
        copyMarkers: state.map.copyMarkers,
        dataBase: state.map.dataBase
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoDrawer)
