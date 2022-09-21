import React from "react";
import { View,Image, StyleSheet, Dimensions } from "react-native";

import BodyText from "../../Constants/BodyText";

const WaitingForNotes = (props) => {
  return (
    <View style={Styles.screen}>
      <BodyText style={Styles.text}>No notes added</BodyText>
      <View style={Styles.imageContainer}>
      <Image
      style ={Styles.imgae}
        fadeDuration={2000}
        source={require("../../assets/image/waiting.png")}
      />
      </View>
      
    </View>
  );
};


const Styles =StyleSheet.create({
    screen : {
        width : "100%",
        alignItems : "center",
        justifyContent : "center",
        marginVertical : 10,
    },

    text : {
        fontSize : 20,
    },

    imageContainer : {
        marginTop : 20,
        width : Dimensions.get("window").width > 360 ? "56%" :  "61%",
        height :500,
        overflow : "hidden"

    },
    imgae : {
        width :'100%',
        height : "100%",
    }
})

export default WaitingForNotes;
