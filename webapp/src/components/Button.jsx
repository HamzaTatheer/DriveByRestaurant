import React from "react";

export default function Button(props) {
  if (props.menuButton == true) {
    return (
      <div
        onClick={props.onClick}
        className="menuButton"
        style={{ padding: "20px" }}
      >
        {props.label}
      </div>
    );
  } else if (props.plusButton == true) {
    return (
      <div
        onClick={props.onClick}
        style={{
          cursor: "pointer",
          fontSize: "1.2em",
          width: "38px",
          height: "32px",
          background: "#E35A5A",
          color: "white",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        +
      </div>
    );
  } else if (props.minusButton == true) {
    return (
      <div
        onClick={props.onClick}
        style={{
          cursor: "pointer",
          fontSize: "1.2em",
          width: "38px",
          height: "32px",
          background: "#E35A5A",
          color: "white",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        -
      </div>
    );
  }

  if (props.simpleButton == true) {
    return (
      <div>
        <input
          onClick={props.onClick}
          style={{
            background: "white",
            borderRadius: "10px",
            outline: "none",
            padding: "10px 20px 10px 20px",
          }}
          type="button"
          value={props.label}
        />
      </div>
    );
  }

  let mystyle = {
    minWidth:"265px",
    minHeight:"45px",
    fontFamily: "Arial",
    border: "none",
    borderRadius: "25px",
    textAlign: "centre",
    fontSize: "1em",
  };

  if (props.redButton == true) {
    mystyle.color = "white";
    mystyle.backgroundColor = "#E35A5A";
  } else if (props.whiteButton == true) {
    mystyle.color = "black";
    mystyle.backgroundColor = "#FFF9F9";
  } else if (props.blackButton == true) {
    mystyle.color = "white";
    mystyle.backgroundColor = "black";
  }

  let disabled = false;
  if (props.disabled) {
    disabled = true;
    mystyle.backgroundColor = "black";
  }

  return (
    <div className="myButton">
      <button
        onClick={props.onClick}
        disabled={disabled}
        style={mystyle}
        type="button"
      >
        {props.label}
      </button>
    </div>
  );

}
