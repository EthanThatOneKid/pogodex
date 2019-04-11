// Dependencies
import React, {Component} from 'react';

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
    return <img src={`https://img.shields.io/badge/type-${this.data}-${this.color}.svg?logo=${this.logo}`}></img>;
  }

}
