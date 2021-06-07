import React, { Component } from "react";

class Counter extends Component {
  state = {
    counterValue: 0,
    inputValue: 1,
  };

  addToCounter = () => {
    this.setState({
      counterValue: this.state.inputValue + this.state.counterValue,
    });
  };

  substractToCounter = () => {
    this.setState({
      counterValue: this.state.counterValue - this.state.inputValue,
    });
  };

  render() {
    let colorChoice =
      this.state.counterValue >= 100
        ? "green"
        : this.state.counterValue <= -100
        ? "red"
        : "";

    return (
      <div>
        <h1 data-testid="header">My Counter</h1>
        <h3 data-testid="counter" className={colorChoice}>
          {this.state.counterValue}
        </h3>
        <button data-testid="subtract-btn" onClick={this.substractToCounter}>
          -
        </button>
        <input
          data-testid="input"
          type="number"
          value={this.state.inputValue}
          className="Counter__input"
          onChange={(e) =>
            this.setState({ inputValue: parseInt(e.target.value) })
          }
        />
        <button data-testid="add-btn" onClick={this.addToCounter}>
          +
        </button>
      </div>
    );
  }
}

export default Counter;
