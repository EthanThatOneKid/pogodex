// Dependencies
import React, {Component} from 'react';

// Export Component
export default class Stats extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
  }

  render() {
    return (
      <table>
        <tbody>
          {
            Object.entries(this.data)
              .map(([stat, value]) => {
                return (
                  <tr>
                    <td><b>{stat}</b></td>
                    <td>{value}</td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    );
  }
}
