import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useReducer,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, KeyboardAvoidingView, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as NotesActions from "../store/actions/Notes";
import CustomHeaderButton from "../Components/UI/HeaderButton";
import Input from "../Components/UI/Input";

const NOTE_UPDATE = "UPDATE";

const fromReducer = (state, action) => {
  switch (action.type) {
    case NOTE_UPDATE:
      const updateValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValadities,
        [action.input]: action.isValid,
      };
      let formIsComplete = true;
      for (const key in updatedValidities) {
        formIsComplete = formIsComplete && updatedValidities[key];
      }
      return {
        inputValues: updateValues,
        inputValadities: updatedValidities,
        formIsValid: formIsComplete,
      };
    default:
      return {
        state,
      };
  }
};

const AddNoteScreen = (props) => {
  const { navigation, route } = props;
  const Dispatch = useDispatch();
  const editNote = route.params
    ? useSelector((state) =>
        state.notes.find((note) => note.id === route.params.noteId)
      )
    : false;

  const [formState, dispatchFormState] = useReducer(fromReducer, {
    inputValues: {
      title: editNote ? editNote.title : null,
      content: editNote ? editNote.description : null,
    },
    inputValadities: {
      title: editNote ? true : false,
      content: editNote ? true : false,
    },
    formIsValid: editNote ? true : false,
  });

  const inputChangeHandler = useCallback((identifier, value, validity) => {
    dispatchFormState({
      type: NOTE_UPDATE,
      value: value,
      isValid: validity,
      input: identifier,
    });
  },[dispatchFormState]);

  const submitHandelr = () => {
    if (!formState.formIsValid) {
      return Alert.alert("Note Incomplete", "Please Complete the Note!", [
        {
          text: "Ok",
        },
      ]);
    }
    if (editNote !== false) {
      Dispatch(NotesActions.updateNote(editNote.id, formState.inputValues.title, formState.inputValues.content));
      navigation.pop();
    } else {
      Dispatch(NotesActions.createNote(formState.inputValues.title, formState.inputValues.content));
      navigation.pop();
    }
  };
  const headerConfig = () => {
    navigation.setOptions({
      title: editNote ? "Edit Note" : "Add Note",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Check"
            iconName="md-checkmark-sharp"
            onPress={submitHandelr}
          />
        </HeaderButtons>
      ),
    });
  };

  useLayoutEffect(headerConfig);

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}
    enabled
    >
      <View style={{ margin: 20 }}>
        <Input
          id={"title"}
          label={"Title"}
          errorText={'Please Enter A Title'}
          initialValue={editNote ? editNote.title : null}
          initiallyValid={editNote ? true : false}
          onInputChange={inputChangeHandler}
          required
        />
        <Input
          id={"content"}
          label={"Content"}
          errorText={'Please Dont leave Content Empty'}
          initialValue={editNote ? editNote.description : null}
          initiallyValid={editNote ? true : false}
          onInputChange={inputChangeHandler}
          numberOfLines={3}
          multiLine
          
          required
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddNoteScreen;
