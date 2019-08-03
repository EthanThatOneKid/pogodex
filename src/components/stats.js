// Dependencies
import React, {Component} from 'react';
import KeyVal from './keyval';

// Export Component
export default class Stats extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
  }

  render() {
    return (
      <div>
        {
          Object.entries(this.data)
            .map(([stat, value]) => <KeyVal k={stat} v={value}></KeyVal>)
        }
      </div>
    );
  }
}
