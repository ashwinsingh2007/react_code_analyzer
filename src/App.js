import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import { Input, Button, Tabs, Collapse, Icon, Select, Spin } from "antd";
import { StickyContainer, Sticky } from "react-sticky";

const { TextArea } = Input;

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        style={{ ...style, zIndex: 1, background: "#fff" }}
      />
    )}
  </Sticky>
);
class App extends Component {
  state = {
    code: "",
    expandIconPosition: "left"
  };

  onPositionChange = expandIconPosition => {
    this.setState({ expandIconPosition });
  };

  updateCodeState = event => {
    console.log("event--", event.target.value);
    this.setState({
      code: event.target.value
    });
  };
  submitCode = () => {
    console.log("this--", this.props);
    this.props.submitLoading({ loading: true });
    this.props.submitCode({ code: this.state.code });
  };
  useSample = () => {
    // this.props.submitLoading({ loading: true });
    this.setState({
      code: `
        var express = require('express');
        var cookieParser = require('cookie-parser');
        var escape = require('escape-html');
        var serialize = require('node-serialize');
        var app = express();
        app.use(cookieParser())
        
        app.get('/', function(req, res) {
        if (req.cookies.profile) {
          var str = new Buffer(req.cookies.profile, 'base64').toString();
          var obj = serialize.unserialize(str);
          if (obj.username) {
            res.send("Hello " + escape(obj.username));
          }
        } else {
            res.cookie('profile', "eyJ1c2VybmFtZSI6ImFqaW4iLCJjb3VudHJ5IjoiaW5kaWEiLCJjaXR5IjoiYmFuZ2Fsb3JlIn0=", {
              maxAge: 900000,
              httpOnly: true
            });
        }
        res.send("Hello World");
        });
        app.listen(3000);`
    });
    // this.props.submitCode({ code: this.state.code });
  };
  getSecurityError = () => {
    const messageArray = this.props.message;
    const { expandIconPosition } = this.state;
    const getTitle = message => (
      <b>
        {message.title} at line {message.line}
      </b>
    );
    if (!messageArray || (messageArray && messageArray.length === 0)) {
      return <p>No Errors</p>;
    }
    return (
      <div>
        {messageArray.map(message => {
          return (
            <div>
              <div className="margin-top-bottom" />
              <Collapse
                defaultActiveKey={["1"]}
                onChange={callback}
                expandIconPosition={expandIconPosition}
              >
                <Panel header={getTitle(message)} key="1">
                  <div className="margin-top-bottom">
                    <b>Issue: </b> {message.title}
                  </div>
                  <div className="margin-top-bottom">
                    <b>Line No: </b> {message.line}
                  </div>
                  <div className="margin-top-bottom">
                    <b>Description: </b> {message.description}
                  </div>
                  <div className="margin-top-bottom">
                    <b>Lines: </b> {message.lines}
                  </div>
                </Panel>
              </Collapse>
            </div>
          );
        })}
      </div>
    );
  };
  getLintErrors = () => {
    const messageString = this.props.lint;
    const messageArray = messageString ? messageString.split("\n") : null;
    const { expandIconPosition } = this.state;
    if (!messageArray) {
      return <p>No Errors</p>;
    }
    return (
      <div>
        {messageArray.map((message, index) => {
          if (message) {
            if (messageArray.length - 2 == index) {
              return <p>{message}</p>;
            } else {
              return (
                <div>
                  <div className="margin-top-bottom " />
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={callback}
                    expandIconPosition={expandIconPosition}
                  >
                    <Panel header="Lint Errors" key="1">
                      <div className="margin-top-bottom">{message}</div>
                    </Panel>
                  </Collapse>
                </div>
              );
            }
          }
        })}
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <h2 className="text-center">
          Static security online code scanner for Node.js applications
        </h2>
        <div className="text-center">
          <Button size="large" onClick={this.useSample}>
            Use Sample code Instead
          </Button>
        </div>
        <div>
          <TextArea
            className="text-code"
            rows={20}
            value={this.state.code}
            onChange={this.updateCodeState}
          />
          <div className="button-submit-code">
            <Button type="primary" size="large" onClick={this.submitCode}>
              Submit Code
            </Button>
          </div>
        </div>
        <div>
          <StickyContainer>
            <div className="card-container">
              <Tabs
                type="card"
                defaultActiveKey="1"
                renderTabBar={renderTabBar}
              >
                <TabPane tab="Results" key="1">
                  {this.props.loading ? (
                    <Spin
                      size="large"
                      style={{ width: "100%", marginTop: "50px" }}
                    />
                  ) : (
                    this.getSecurityError()
                  )}
                </TabPane>
                <TabPane tab="Lint Errors" key="2">
                  {this.props.loading ? (
                    <Spin
                      size="large"
                      style={{ width: "100%", marginTop: "50px" }}
                    />
                  ) : (
                    this.getLintErrors()
                  )}
                </TabPane>
              </Tabs>
            </div>
          </StickyContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ counter }) => ({
  message: counter.message,
  lint: counter.lint,
  loading: counter.loading
});

const mapDispatchToProps = dispatch => ({
  submitCode: data => dispatch({ type: "SUBMIT_CODE", data }),
  submitLoading: data => dispatch({ type: "LOADING", data })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
