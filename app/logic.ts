import { SharedValue } from "react-native-reanimated";
import { height, MAX_SPEED, RADIUS, width } from "./constants";
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

// TODO
export const resolveWallCollision = (object: ShapeInterface) => {
  "worklet";
  const circleObject = object as CircleInterface;
  // right collition
  if (circleObject.x.value + circleObject.r > width) {
    // Calculate the overshot
    circleObject.x.value = width - circleObject.r * 2;
    circleObject.vx = -circleObject.vx;
    circleObject.ax = -circleObject.ax;
  }

  // Collision with the bottom wall
  else if (circleObject.y.value + circleObject.r > height) {
    circleObject.y.value = height - circleObject.r * 2;
    circleObject.vy = -circleObject.vy;
    circleObject.ay = -circleObject.ay;
  }
  // Collision with the left wall
  else if (circleObject.x.value - circleObject.r < 0) {
    circleObject.x.value = circleObject.r * 2;
    circleObject.vx = -circleObject.vx;
    circleObject.ax = -circleObject.ax;
  }

  // Detect collision with the top wall
  else if (circleObject.y.value - circleObject.r < 0) {
    circleObject.y.value = circleObject.r;
    circleObject.vy = -circleObject.vy;
    circleObject.ay = -circleObject.ay;
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
  for (const o of objects) {
    if (o.type === "Circle") {
      resolveWallCollision(o);
    }
  }
};
