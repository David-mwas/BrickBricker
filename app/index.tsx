import { Canvas, Circle, useClock } from "@shopify/react-native-skia";
import { StyleSheet, Text, View } from "react-native";
import { CircleInterface } from "./types";
import { useFrameCallback, useSharedValue } from "react-native-reanimated";
import { BALL_COLOR, RADIUS } from "./constants";
import { animate, createBouncingExample } from "./logic";

const Index = () => {
  const CircleObject: CircleInterface = {
    type: "Circle",
    id: 0,
    x: useSharedValue(0),
    y: useSharedValue(0),
    r: RADIUS,
    ax: 0,
    ay: 0,
    vx: 0,
    vy: 0,
  };

  createBouncingExample(CircleObject);

  useFrameCallback((frameInfo) => {
    if (!frameInfo.timeSincePreviousFrame) return;

    animate([CircleObject],frameInfo.timeSincePreviousFrame,0)
  });
  return (
    <View style={styles.container}>
      <Canvas style={{ flex: 1 }}>
        <Circle
          cx={CircleObject.x}
          cy={CircleObject.y}
          r={RADIUS}
          color={BALL_COLOR}
        />
      </Canvas>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  titleContainer: {
    flexDirection: "row",
  },
  titleTextNormal: {
    color: "white",
    fontSize: 40,
  },
  titleTextBold: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
});
