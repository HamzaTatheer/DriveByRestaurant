import React from "react";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./../redux/actions/cartAction";
import { axios_authenticated as axios } from "../axios/axios-config";

export default function CheckoutItem({ id, name, price, quantity }) {
  let dispatch = useDispatch();

  return (
    <div>
      <div
        style={{ justifyContent: "space-evenly", alignItems: "center" }}
        className="d-flex"
      >
        <div>{name}</div>
        <div>
          <b>{price * quantity}</b>
        </div>
        <div>
          <Button plusButton onClick={() => dispatch(addToCart(id))} />
        </div>
        <div>{quantity}</div>
        <div>
          <Button minusButton onClick={() => dispatch(removeFromCart(id))} />
        </div>
      </div>
      <hr />
    </div>
  );
}
