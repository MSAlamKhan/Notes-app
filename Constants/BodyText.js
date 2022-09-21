import React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "./Colors";

const BodyText = (props) => (
  <Text style={{ ...styles.general, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  general: {
    color:Colors.accentColor,
    fontFamily: "regularFont",
    fontSize : 18
  },
});

export default BodyText;
