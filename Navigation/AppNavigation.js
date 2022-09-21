import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import AddNoteScreen from "../Screens/AddNoteScreen";
import Colors from "../Constants/Colors";
import NotesViewScreen from "../Screens/ViewNoteScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primaryColor,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          headerTitleStyle: {
            fontFamily: "boldFont",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Note Add / Edit" component={AddNoteScreen} />
        <Stack.Screen name="Note View" component={NotesViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
