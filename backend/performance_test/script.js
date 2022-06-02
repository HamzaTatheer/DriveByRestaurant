import http from "k6/http";
import { check } from "k6";

export const options = {
  discardResponseBodies: false,
  scenarios: {
    scene1: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "5s", target: 50 },
        { duration: "30s", target: 50 },
        { duration: "5s", target: 500 },
        { duration: "30s", target: 500 },
        { duration: "5s", target: 1000 },
        { duration: "1m", target: 1000 },
      ],
      gracefulRampDown: "0s",
    },
  },
};

export function setup() {}

export default function (data) {
  const res = http.get("http://localhost:3000/api/menu/menu");
  check(res, {
    "is status 200": (r) => r.status === 200,
    "All menu items received": (r) => {
      const json_obj = r.json();
      return (
        json_obj.length >= 2 &&
        json_obj[0].name === "Chunky Burger" &&
        json_obj[1].name === "Pepsi"
      );
    },
  });
}

export function teardown(data) {}
