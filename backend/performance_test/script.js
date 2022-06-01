import http from "k6/http";
import { check } from "k6";

export function setup() {}

export default function (data) {
  const res = http.get("http://localhost:3000/api/menu/menu");
  check(res, {
    "is status 200": (r) => r.status === 200,
    "All menu items received": (r) => {
      const json = r.json();
      return (
        json.length >= 2 &&
        json[0].name === "Chunky Burger" &&
        json[1].name === "Pepsi"
      );
    },
  });
}

export function teardown(data) {}
