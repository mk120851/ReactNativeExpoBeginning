import { Container } from "unstated";
import Seeder from "../models/seeder/Seeder.js";
import axios from "axios";
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

  getDataFromServer() {
    this.setState({ isDataLoading: true });
    axios
      .get(INVOICE_API_ENDPOINT, { params: {} })
      .then((results) => {
        console.log("HTTP Request succeeded.");
        console.log(results);
        this.setState({ data: results.data });
        this.setState({ isDataLoading: false });
      })
      .catch(() => {
        console.log("HTTP Request failed.");
        this.setState({ isDataLoading: false });
      });
  }

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
