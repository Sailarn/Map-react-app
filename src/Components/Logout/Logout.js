import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {logout} from "../../store/actions/auth";
import {
    currentMarkers,
    loadedStatus,
    setDatabase
} from "../../store/actions/map";

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
        this.props.currentMarkers([]);
        this.props.setDatabase([]);
        this.props.loadedStatus(false);
    }

    render() {
        return <Redirect to={"/"}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setDatabase: () => dispatch(setDatabase([])),
        loadedStatus: () => dispatch(loadedStatus(false)),
        logout: () => dispatch(logout()),
        currentMarkers: () => dispatch(currentMarkers([]))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Logout);
