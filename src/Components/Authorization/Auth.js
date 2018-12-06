import React, { Component } from "react";
import {
  MDBBtn,
  Animation,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import Input from "../UI/Input/Input";
import is from "is_js";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Enter your e-mail",
        errorMessage: "Enter correct e-mail adress (example@mail.com)",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: "",
        type: "password",
        label: "Enter your password",
        errorMessage: "Enter at least 6 characters",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };
  submitHandler = event => {
    event.preventDefault();
  };
  loginBtn = () => {
    if (
      !this.state.formControls.password.valid ||
      !this.state.formControls.email.valid
    ) {
      return;
    } else {
      this.props.auth(
        this.state.formControls.email.value,
        this.state.formControls.password.value,
        true
      );
    }
  };
  registerBtn = () => {
    if (
      !this.state.formControls.password.valid ||
      !this.state.formControls.email.valid
    ) {
      return;
    } else {
      this.props.auth(
        this.state.formControls.email.value,
        this.state.formControls.password.value,
        false
      );
    }
  };
  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  }
  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    });
  };
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }
  render() {
    return (
      <Animation type="fadeIn" count={1}>
        <MDBContainer style={{padding: '20px'}}>
          <MDBRow>
            <MDBCol className="mt-5" xl="12">
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <p className="h1-responsive text-center mb-4">Authorization</p>
                  <form onSubmit={this.submitHandler}>
                    {this.renderInputs()}
                    <MDBRow center>
                      <MDBBtn
                        onClick={this.loginBtn}
                        color="dark-green"
                        size="md"
                      >
                        Sign In
                      </MDBBtn>
                      <MDBBtn
                        onClick={this.registerBtn}
                        color="mdb-color"
                        size="md"
                      >
                        Sign up
                      </MDBBtn>
                    </MDBRow>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Animation>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  };
}
export default connect(
  null,
  mapDispatchToProps
)(Auth);
