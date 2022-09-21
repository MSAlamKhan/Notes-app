import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { createStore,} from "redux";
import { Provider } from "react-redux";

import * as Fonts from "expo-font";
import AppNavigator from "./Navigation/AppNavigation";
import noteReducer from "./store/reducers/Notes";

const fetchFonts = () => {
  return Fonts.loadAsync({
    regularFont: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
    boldFont: require("./assets/fonts/RobotoCondensed-Bold.ttf"),
  });
};

export default function App() {
  const store = createStore(noteReducer);

  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
