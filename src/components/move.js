// Dependencies
import React, {Component} from 'react';
import KeyVal from './keyval';

// Helpers
import colors from './helpers/colors.js';
import types from './helpers/types.js';

// Export Component
export default class Move extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.color = colors[this.data.type][0];
  }

  render() {
    const name = `${this.data.name}${this.data.legacy ? " ℰ" : ""}`;
    return <KeyVal k={name} v={this.data.power} c={this.color}></KeyVal>;
  }
}
