import { Container } from "unstated";
import Seeder from "../models/seeder/Seeder.js";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
// You should launch publick server using by ngrock or etc...
const INVOICE_API_ENDPOINT = "http://cb63ebdc15e0.ngrok.io/invoice.js";

export default class InvoiceContainer extends Container {
  constructor(props = {}) {
    super();
    this.state = {
      data: props.initialSeeding ? Seeder.getSeed() : this.getEmptyData(),
      isDataLoading: false,
    };
  }

  getDataFromServer(endpoint) {
    this.setState({ isDataLoading: true });
    console.log(endpoint);
    axios
      .get(endpoint, { params: {} })
      .then(results => {
        console.log("HTTP Request succeeded.");
        console.log(results);
        this.setStateAndSave({ data: results.data });
        this.setState({ isDataLoading: false });
      })
      .catch(() => {
        console.log("HTTP Request failed.");
        this.setState({ isLoading: false });
      });
  }

  // Save data to the local storage, then setState.
  setStateAndSave = async (updateStates) => {
    try {
      for (var k in updateStates) {
        await AsyncStorage.setItem(k, JSON.stringify(updateStates[k]));
      }
      this.setState(updateStates);
    } catch (error) {
      // Error saving data
      console.log("storage error");
    }
  };

  // Load data from the local storage
  load = async () => {
    try {
      const value = await AsyncStorage.getItem("data");
      if (value !== null) {
        // Data found
        this.setState({ data: JSON.parse(value) });
      } else {
        this.setState({ data: this.getEmptyData() });
      }
    } catch (error) {
      // Error retrieving data
      console.log("storage error");
    }
  };

  seed() {
    this.setState({ data: Seeder.getSeed() });
  }

  clear() {
    this.setState({ data: this.getEmptyData() });
  }

  getEmptyData() {
    return {
      customers: [],
      products: [],
      invoices: [],
    };
  }
}
