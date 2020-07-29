import React, { Component } from "react";
import "./App.css";
import * as distance from "jaro-winkler";
import { data } from "./data";

class App extends Component {
  state = {
    compareA: "",
    compareB: "",
    comparisonResult: 0,
    getA: "",
    getResult: "",
  };

  handleInputChnage = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  compare = () => {
    let similarity = distance(this.state.compareA, this.state.compareB);
    this.setState({
      comparisonResult: Math.floor(similarity * 100),
    });
  };

  findResolution = () => {
    let resolution = "Sorry!! There is no resolution to this error";
    let maxmatch = 0;
    let found = false

    data.map((errorRecord) => {
      let similarity = distance(this.state.getA, errorRecord.error);

      if (maxmatch < similarity && similarity > 0.90) {
        maxmatch = similarity
        resolution = errorRecord.resolution;
        found = true
      }
      return null;
    });

    this.setState({
      getResult: `Solution: ${resolution}. Match %: ${found ? Math.floor(maxmatch*100) : 'N/A'}`,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="title">Text Comparison using Jaro Winkler</div>
        <div className="comparison-container">
          <textarea
            onInput={this.handleInputChnage("compareA")}
            className="input"
          />
          <textarea
            onInput={this.handleInputChnage("compareB")}
            className="input"
          />
          <button onClick={this.compare} className="btn">
            Compare
          </button>
          <div className="result">Match % - {this.state.comparisonResult}</div>
        </div>
        <div className="divider"></div>
        <div className="resolution-container">
          <textarea
            onInput={this.handleInputChnage("getA")}
            className="input"
          />
          <button onClick={this.findResolution} className="btn">
            Resolution?
          </button>
          <div className="result">{this.state.getResult}</div>
        </div>
      </div>
    );
  }
}

export default App;
