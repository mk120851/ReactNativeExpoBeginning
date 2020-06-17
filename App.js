import React from "react";
import { Provider } from "unstated";
import { StyleSheet, Button, Text, View } from "react-native";
import InvoiceContainer from "./containers/InvoiceContainer";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./components/HomeScreen";
import InvoiceEditScreen from "./components/InvoiceEditScreen";
import SummaryScreen from "./components/SummaryScreen";
import BarcodeScannerScreen from "./components/BarcodeScannerScreen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    InvoiceEdit: InvoiceEditScreen,
    Summary: SummaryScreen,
    BarcodeScanner: BarcodeScannerScreen,
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }

    let globalState = new InvoiceContainer({ initialSeeding: true });
    return (
      <Provider inject={[globalState]}>
        <AppContainer />
      </Provider>
    );
  }
}
