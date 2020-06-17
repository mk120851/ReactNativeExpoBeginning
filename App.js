import React from "react";
import { Provider } from "unstated";
import InvoiceContainer from "./containers/InvoiceContainer";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./components/HomeScreen";
import InvoiceEditScreen from "./components/InvoiceEditScreen";
import SummaryScreen from "./components/SummaryScreen";

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    InvoiceEdit: InvoiceEditScreen,
    Summary: SummaryScreen,
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    let globalState = new InvoiceContainer({ initialSeeding: true });
    return (
      <Provider inject={[globalState]}>
        <AppContainer />
      </Provider>
    );
  }
}
