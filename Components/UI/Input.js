import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : null,
    isValid: props.initiallyValid ? true : false,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangehandler = (text) => {
    let validity = true;
    if (props.required && text.trim().length === 0) {
      validity = false;
    }
    // if (props.minLength != null && text.length < props.minLength) {
    //   isValid = false;
    // }
    dispatchInputState({ type: INPUT_CHANGE, value: text, isValid: validity });
  };

  const lostFocusHandler = () => {
    dispatchInputState({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.lable}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value} //inputState.value
        onChangeText={textChangehandler} //textChangeHandler
        onBlur={lostFocusHandler} //lostFocusHandler
      />
      {!inputState.isValid && inputState.touched && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  lable: {
    fontFamily: "boldFont",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#888",
    borderBottomWidth: 1,
  },
  errorText: {
    fontFamily: "regularFont",
    fontSize: 13,
    color: "red",
  },
});
export default Input;
