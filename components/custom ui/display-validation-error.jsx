import React from "react";

export const DisplayValidationError = ({ value }) => {
  if (value && value._errors) {
    return <p>{value._errors[0]}</p>;
  } else {
    return null;
  }
};
