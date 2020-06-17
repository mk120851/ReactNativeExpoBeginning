import React from "react";
import {
  View,
  Container,
  Content,
  Text,
  Button,
  Icon,
  List,
  ListItem,
  Left,
  Right,
} from "native-base";
import styles from "../styles.js";
import InvoiceContainer from "../containers/InvoiceContainer";
import { Subscribe } from "unstated";

class HomeScreenContent extends React.Component {
  constructor(props) {
    super(props);
    this.onImportClick = this.onImportClick.bind(this);
  }

  onImportClick() {
    this.props.globalState.getDataFromServer();
  }

  render() {
    let globalState = this.props.globalState;
    let invoiceList = <Text>No invoice</Text>;

    if (globalState.state.isDataLoading) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }

    if (globalState.state.data.invoices.length) {
      invoiceList = (
        <List>
          {globalState.state.data.invoices.map((invoice) => {
            return (
              <ListItem key={invoice.id} noIndent>
                <Left>
                  <Text key={invoice.id}>
                    {invoice.id + " : " + invoice.date}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            );
          })}
        </List>
      );
    }
    return (
      <Container>
        <Content>
          <View style={{ flexDirection: "row" }}>
            <Left>
              <Button light onPress={() => this.onImportClick()}>
                <Icon type="FontAwesome5" name="file-import" />
                <Text style={{ paddingLeft: 0 }}>Import</Text>
              </Button>
            </Left>
            <Right>
              <Button onPress={() => this.props.navigation.navigate("Summary")}>
                <Icon type="FontAwesome5" name="poll-h" />
                <Text style={{ paddingLeft: 0 }}>Summary</Text>
              </Button>
            </Right>
          </View>

          {invoiceList}

          <View style={{ flexDirection: "row" }}>
            <Left>
              <Button
                onPress={() => this.props.navigation.navigate("InvoiceEdit")}
              >
                <Icon type="FontAwesome5" name="file-invoice-dollar" />
                <Text style={{ paddingLeft: 0 }}>InvoiceEdit</Text>
              </Button>
            </Left>
          </View>
        </Content>
      </Container>
    );
  }
}

const HomeScreen = ({ navigation }) => {
  return (
    <Subscribe to={[InvoiceContainer]}>
      {(globalState) => (
        <HomeScreenContent globalState={globalState} navigation={navigation} />
      )}
    </Subscribe>
  );
};

export default HomeScreen;
