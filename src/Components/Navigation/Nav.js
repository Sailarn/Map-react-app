import React from "react";
import "./activeStyle.css";
import {
  Navbar,
  NavbarNav,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  Collapse,
  NavItem,
  Container,
  Modal,
  ModalFooter,
  ModalHeader
} from "mdbreact";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      modal: false
    };
  }
  onClick = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <Navbar color="black" dark expand="lg">
        <Container>
          <Modal
            className="text-black"
            size="lg"
            side
            position="top"
            backdrop={true}
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
            <ModalHeader
              className="text-center"
              titleClass="w-100"
              tag="p"
              toggle={this.toggle}
            >
              Are you sure?
            </ModalHeader>
            <ModalFooter className="justify-content-center">
              <NavLink className="btn btn-elegant" to="/" onClick={this.toggle}>Close</NavLink>
              <NavLink className="btn btn-outline-danger waves-effect" to="/logout">Log out</NavLink>
            </ModalFooter>
          </Modal>
          <NavbarBrand>
            <strong className="white-text">Map Application</strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.onClick} />
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem>
                <NavLink exact to="/">
                  Map itself
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about">About</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <NavLink to="#!" onClick={this.toggle}>Logout</NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Nav;
