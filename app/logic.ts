import { SharedValue } from "react-native-reanimated";
import { MAX_SPEED, RADIUS } from "./constants";
import { CircleInterface, ShapeInterface } from "./types";

export const createBouncingExample = (circleObject: CircleInterface) => {
  "worklet";
  circleObject.x.value = 100;
  circleObject.y.value = 450;
  circleObject.r = RADIUS;
  circleObject.ax = 0.5;
  circleObject.ay = 1;
  circleObject.vx = 0;
  circleObject.vy = 0;
};
const move = (object: ShapeInterface, dt: number) => {
  "worklet";
  if (object.type === "Circle") {
    object.vx += object.ax * dt;
    object.vy += object.ay * dt;
    if (object.vx > MAX_SPEED) {
      object.vx = MAX_SPEED;
    }
    if (object.vx < -MAX_SPEED) {
      object.vx = -MAX_SPEED;
    }
    if (object.vy > MAX_SPEED) {
      object.vy = MAX_SPEED;
    }
    if (object.vy < -MAX_SPEED) {
      object.vy = -MAX_SPEED;
    }
    object.x.value += object.vx * dt;
    object.y.value += object.vy * dt;
  }
};
export const animate = (
  objects: ShapeInterface[],
  timeSincePreviousFrame: number,
  brickCount: number
) => {
  "worklet";
  for (const o of objects) {
    if (o.type === "Circle") {
      move(o, 0.15);
    }
  }
};
