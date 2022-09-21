import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import NotesDisplay from "../Components/App/NotesDisplay";
import * as NotesActions from "../store/actions/Notes";
import CustomHeaderButton from "../Components/UI/HeaderButton";
import WaitingForNotes from "../Components/App/WaitingForNotes";
import BodyText from "../Constants/BodyText";

const HomeScreen = (props) => {
  const { navigation } = props;

  const headrConfig = () => {
    navigation.setOptions({
      title: "Notes App",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName="md-add"
            onPress={() => navigation.navigate("Note Add / Edit")}
          />
        </HeaderButtons>
      ),
    });
  };

  useLayoutEffect(headrConfig);

  const userNotes = useSelector((state) => state.notes);
  const Dispatch = useDispatch();

  if (userNotes.length === 0) {
    return <WaitingForNotes />;
  }
  return (
    <View style={styles.screen}>
      <BodyText style={{marginBottom : 5}}>Your Notes</BodyText>
      <NotesDisplay
        dataSource={userNotes}
        onEditHandler={(id) => {
          navigation.navigate("Note Add / Edit", { noteId: id });
        }}
        onDeleteHandler={(id) => {
          Dispatch(NotesActions.deleteNote(id));
        }}
        onNoteHandler={(id) =>
          navigation.navigate("Note View", {noteId: id })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    paddingBottom : 20
  },
});
export default HomeScreen;
