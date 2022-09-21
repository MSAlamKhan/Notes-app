import React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "./Colors";

const HeadingText = (props) => (
  <Text style={{ ...styles.general, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  general: {
    fontFamily: "boldFont",
    fontSize : 30,
    color: Colors.accentColor
    
  },
});

export default HeadingText;
