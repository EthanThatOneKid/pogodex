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
      <table key="stats">
        <tbody align="center">
          {
            Object.entries(this.data)
              .map(([stat, value]) => {
                return (
                  <tr key={stat}>
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
