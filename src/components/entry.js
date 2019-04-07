import React, {Component} from 'react';
import colors from './helpers/colors.js';

export default class Entry extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.grad = colors[this.data.types[0]];
  }

  render() {
    const style = {
      "div": {
        "display": "inline-block",
        "width": "7vw",
        "margin": "0",
        "position": "relative",
        "background-image": `radial-gradient(#${this.grad[0]}, #${this.grad[1]})`
      },
      "img": {
        "display": "block",
        "margin": "auto"
      }
    };
    return (
      <div className="entry" style={style.div}>
        <img style={style.img} src={this.data.icon}></img>
        <div className="info">
          <p>{this.data.name}</p>
          {
            this.data.types.map(t => {
              const c = colors[t][0];
              return <img src={`https://img.shields.io/badge/type-${t}-${c}.svg`}></img>;
            })
          }
          <table>
            <tr><td>spd</td><td>atk</td><td>def</td></tr>
            <tr>
              <td>{this.data.stats.stamina}</td>
              <td>{this.data.stats.attack}</td>
              <td>{this.data.stats.defense}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
