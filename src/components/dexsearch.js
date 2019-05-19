// Dependencies
import React, {Component} from 'react';

// Helpers

// Components

// Export Component
export default class Entry extends Component {

  render() {
    const style = {
      "display": "inline-block"
    };
    return (
      <input
        name="query"
        type="text"
        placeHolder="search..."
        style={style}
        onChange={this.props.onSearch}
      />
    );
  }
}
