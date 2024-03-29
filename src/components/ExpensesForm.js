import moment from "moment";
import React from "react";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export default class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calenderFocuesd: false,
      error: "",
    };
  }
  descriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  noteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calenderFocuesd: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Pleas provid description and amount",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}

        <input
          type="text"
          className="text-input"
          placeholder="Description"
          autoFocus
          value={this.state.description}
          onChange={this.descriptionChange}
        />
        <input
          className="text-input"
          type="number"
          placeholder="Amount"
          value={this.state.amount}
          step="any"
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calenderFocuesd}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          className="textarea"
          value={this.state.note}
          onChange={this.noteChange}
          placeholder="Add note to your expense"
        />
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}
