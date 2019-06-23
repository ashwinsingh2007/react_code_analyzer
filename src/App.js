import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { Input, Button } from "antd";

const { TextArea } = Input;

class App extends Component {
  state = {
    code: ""
  };
  updateCodeState = event => {
    console.log("event--", event.target.value);
    this.setState({
      code: event.target.value
    });
  };
  submitCode = () => {
    this.props.submitCode({ code: this.state.code });
  };
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        {/* <p>
          Clicked: {counter} times
          <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
          <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>{' '}
          <button onClick={() => dispatch({ type: 'INCREMENT_IF_ODD' })}>Increment if odd</button>{' '}
          <button onClick={() => dispatch({ type: 'INCREMENT_ASYNC' })}>Increment async</button>
        </p> */}
        <TextArea rows={10} onChange={this.updateCodeState} />
        <Button type="primary" onClick={this.submitCode}>
          Primary
        </Button>
        {this.props.message}
      </div>
    );
  }
}

const mapStateToProps = ({counter}) => ({message: counter.message});

const mapDispatchToProps = dispatch => ({
  submitCode: data => dispatch({ type: "SUBMIT_CODE", data })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
