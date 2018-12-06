import React from "react";
import { MDBInput } from "mdbreact";

function isInvalid({ valid, touched, shouldValidate, value }) {
  if (value.length <= 0) {
    return;
  } else {
    return !valid && shouldValidate && touched;
  }
}

const Input = props => {
  const inputType = props.type || "text";
  return (
    <div>
      <MDBInput
        label={props.label}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? <span>{props.errorMessage}</span> : null}
    </div>
  );
};

export default Input;
