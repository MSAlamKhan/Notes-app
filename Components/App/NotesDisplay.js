import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";
import BodyText from "../../Constants/BodyText";

const DisplayNotes = (props) => {
  const renderNote = (itemData) => {
    return (
      <View style={styles.card}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(Colors.accentColor, true)}
          useForeground={true}
          onPress={() => {
            props.onNoteHandler(itemData.item.id);
          }}
        >
          <View style={styles.noteContent}>
            <BodyText>{itemData.item.title}</BodyText>
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => {
                  props.onEditHandler(itemData.item.id);
                }}
              >
                <Ionicons
                  name="md-create"
                  size={23}
                  color={Colors.primaryColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icons}
                onPress={() => props.onDeleteHandler(itemData.item.id)}
              >
                <Ionicons name="md-trash" size={23} color={"red"} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };
  return <FlatList data={props.dataSource} renderItem={renderNote} />;
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 50,
    shadowColor: "black",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    overflow: "hidden",
  },
  noteContent: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icons: {
    paddingHorizontal: 5,
  },
});
export default DisplayNotes;
