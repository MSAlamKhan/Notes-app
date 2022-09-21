import React, { useLayoutEffect } from "react";
import {View,Text, StyleSheet, ScrollView} from 'react-native'
import { useSelector } from "react-redux";
import BodyText from "../Constants/BodyText";
import HeadingText from "../Constants/HeadingText";

const NotesViewScreen = props => {

const {navigation, route} = props;
const selectedNote = useSelector(state => state.notes.find(note => note.id === route.params.noteId))
    const headerConfig = () => {
        navigation.setOptions({
            title : selectedNote.title
        })
    }

    useLayoutEffect(headerConfig,[selectedNote])
return (
    <View style={styles.card}>
        <ScrollView style={styles.descriptionContiner}>

        <BodyText style={{textAlign:'center'}}>
            {selectedNote.description}
        </BodyText>
        </ScrollView>
    </View>
)
}
const styles= StyleSheet.create({
     card: {
    flex: 1,
    height: 50,
    shadowColor: "black",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    margin: 10,
  },
  descriptionContiner:{
    marginVertical : 20
    ,marginHorizontal : 20
  }
})
export default NotesViewScreen