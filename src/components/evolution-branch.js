// Dependencies
import React, {Component} from 'react';

// Export Component
export default class EvolutionBranch extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
  }

  render() {
    return (
      <p>{JSON.stringify(this.data)}</p>
    );
  }
}
