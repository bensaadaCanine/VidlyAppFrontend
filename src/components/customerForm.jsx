import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveCustomer, getCustomer } from "../services/customersService";

class CustomerForm extends Form {
  state = {
    data: { name: "", phone: "", isGold: false },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    phone: Joi.string().required().label("Phone Number"),
    isGold: Joi.boolean(),
    _id: Joi.string(),
  };

  async componentDidMount() {
    const customerID = this.props.match.params.id;
    if (customerID === "new") return;
    const { data: customer } = await getCustomer(customerID);
    this.setState({ data: this.mapToViewModel(customer) });
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    };
  }

  constructor(props) {
    super(props);
    this.handleIsGold = this.handleIsGold.bind(this);
  }

  doSubmit = async () => {
    try {
      await saveCustomer(this.state.data);
      this.props.history.push("/customers");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = error.response.data;
        this.setState({ errors });
      }
    }
  };

  handleIsGold() {
    const data = { ...this.state.data };
    data.isGold = !data.isGold;
    this.setState({ data });
  }

  render() {
    const customerID = this.props.match.params.id;
    return (
      <div>
        <h1>{customerID !== "new" ? "Update Customer" : "New Customer"}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone Number")}
          <div className="form-check my-5">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value={this.state.data.isGold}
              onChange={this.handleIsGold}
              checked={this.state.data.isGold}
              key={this.state.data.name}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Gold User
            </label>
          </div>
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
