import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import { About } from "./Components/About/About";
import Nav from "./Components/Navigation/Nav";
import Auth from "./Components/Authorization/Auth";
import MapContainer from "./Components/Map/Map";
import { connect } from "react-redux";
import Logout from "./Components/Logout/Logout";
import { autoLogin } from "./store/actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let nav;
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={MapContainer} />
          <Route path="/about" component={About} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
      nav = (<Nav/>);
    }
    return (
      <Layout>
        { nav }
        {routes}
      </Layout>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
