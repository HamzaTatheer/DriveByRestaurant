import http from "k6/http";
import { check } from "k6";

export const options = {
  discardResponseBodies: false,
  scenarios: {
    scene2: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 50,
      maxVUs: 15000,
      stages: [
        { target: 100, duration: "5s" },
        { target: 200, duration: "5s" },
        { target: 200, duration: "1m" },
        { target: 500, duration: "30s" },
        { target: 500, duration: "1m" },
      ],
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
