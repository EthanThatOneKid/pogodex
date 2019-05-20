// Dependencies
import React, {Component} from 'react';

// Export Component
export default class Entry extends Component {

  render() {
    const style = {
      "display": "inline-block"
    };
    return (
      <input
        type="text"
        placeholder="search..."
        rel="noopener noreferrer"
        style={style}
        onChange={this.props.onSearch}
      />
    );
  }
}
