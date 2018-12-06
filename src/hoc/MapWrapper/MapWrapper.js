import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { MDBCol, MDBRow } from "mdbreact";

class Wrapper extends Component {
  render() {
    return (
      <MDBRow>
        <MDBCol xl="12" style={{height: '100vh', padding: '0px'}}>{this.props.children}</MDBCol>
      </MDBRow>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDfXMtNQ9WiZVSmJx8FI0EwzFKhyzwM6vg&libraries=places",
  language: "ru"
})(Wrapper);
