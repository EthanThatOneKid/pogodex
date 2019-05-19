// Dependencies
import React, {Component} from 'react';

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
    const name = `${this.data.name}${this.data.legacy ? " ℰ" : ""}`,
          svg = `https://img.shields.io/badge/${name}-${this.data.power}-${this.color}.svg?logo=${types[this.data.type]}`,
          alt = `${this.data.name} attack`;
    return (
      <img src={svg} alt={alt}></img>
    );
  }
}
