// Dependencies
import React, {Component} from 'react';
import KeyVal from './keyval';

// Helpers
import colors from './helpers/colors.js';
import types from './helpers/types.js';

// Export Component
export default class Type extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.color = colors[this.data][0];
    this.logo = types[this.data];
  }

  render() {
    return <KeyVal k="type" v={this.data} c={this.color} i={this.logo}></KeyVal>;
  }

}
