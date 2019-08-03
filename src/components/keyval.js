// Dependencies
import React, {Component} from 'react';

// Export Component
export default class KeyVal extends Component {

  constructor(props) {
    super(props);
    this.key = props.k; // key
    this.val = props.v; // value
    this.col = props.c; // custom color
    this.ico = props.i; // optional icon
    this.bgc = "#1D1E22"; // default background color
    this.fco = "#FFF"; // default font color
  }

  render() {

    const style = {
      container: {
        color: this.fco,
        padding: "2px"
      },
      ico: {
        width: "12px"
      },
      spanspan: {
        padding: "5px",
        border: `1px solid ${this.bgc}`
      },
      spanleft: {
        backgroundColor: !!this.col ? `#${this.col}` : this.bgc,
        borderRadius: "5px 0 0 5px"
      },
      spanright: {
        backgroundColor: this.bgc,
        borderRadius: "0 5px 5px 0"
      }
    };

    return (
      <span style={style.container}>
        <span style={{...style.spanspan, ...style.spanleft}}>{
          !!this.ico
            ? <img src={this.ico} style={style.ico}></img>
            : <span></span>
        }<b>{this.key}</b></span><span style={{...style.spanspan, ...style.spanright}}>{this.val}</span>
      </span>
    );

  }

}
