import React from "react";
import { MDBContainer, Card, CardBody, CardTitle, Row } from "mdbreact";
import "./About.css";

export const About = props => {
  return (
    <MDBContainer fluid className="about-container">
      <Row style={{ height: "100vh", alignItems: "center" }} center>
        <Card>
          <CardBody>
            <CardTitle className="display-4 text-align-center">My React first application</CardTitle>
            <p className="h2-responsive">
              This small application was built in a week.
            </p>
            <p className="h3-responsive">Started on</p>
            <p className="h4-responsive">19/11/2018</p>
            <p className="h5-responsive">Ended on</p>
            <p className="h4-responsive">26/11/2018</p>
            <p className="h5-responsive">Updated on 07/12/2018</p>
            <p className="h5-responsive">Second update on 30/12/2018 (small one)</p>
            <p className="h5-responsive">P.S: This is my first App ( ͡° ͜ʖ ͡°)</p>
          </CardBody>
        </Card>
      </Row>
    </MDBContainer>
  );
};
