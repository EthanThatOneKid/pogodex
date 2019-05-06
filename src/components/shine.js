// Dependencies
import React, {Component} from 'react';

// Export Component
export default class Shine extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
  }

  render() {
    const shiny = this.data ? "✨" : "";
    return <span key="shine">{shiny}</span>;
  }

}
