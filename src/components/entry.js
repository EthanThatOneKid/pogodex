// Dependencies
import React, {Component} from 'react';

// Helpers
import colors from './helpers/colors.js';

// Components
import Type from './type.js';
import Move from './move.js';
import Stats from './stats.js';
import Shine from './shine.js';
import EvolutionBranch from './evolution-branch.js';

// Export Component
export default class Entry extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.grad = colors[this.data.types[0]];
    this.state = {focus: false};
  }

  toggle = () => {
    this.setState(state => ({focus: !state.focus}));
  }

  render() {
    let style = {
      "div": {
        "backgroundImage": `radial-gradient(#${this.grad[0]}, #${this.grad[1]})`,
        "display": "inline-block",
        "width": "100%"
      },
      "summary": {
        "textAlign": "center"
      }
    };
    if (this.state.focus) {
      style.div = Object.assign(style.div, {
        "margin": 0,
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%"
      });
    }
    return (

      <div className="entry" id={this.data.name} style={style.div}>

        <details>

          <summary style={style.summary} onClick={this.toggle}>
            <img className="icon" alt={this.data.name} src={this.data.icon}></img>
            {this.data.name}
            <Shine data={this.data.shiny}/>
          </summary>

          <table><tbody align="center"><tr>
            <td>
              {this.data.types.map((t, i) => <Type data={t} key={i}/>)}
            </td>
          </tr><tr>
            <td>
              <p>stats:</p>
              <Stats data={this.data.stats}/>
            </td>
          </tr><tr>
            <td>
              <p>fast attacks:</p>
              {this.data.moves.fast.map((m, i) => <Move data={m} key={`fast-${i}`}/>)}
              <p>charge moves:</p>
              {this.data.moves.charge.map((m, i) => <Move data={m} key={`charge-${i}`}/>)}
            </td>
          </tr><tr>
            <td>
              {(!!this.data.evolution.length) ? <p>evolution:</p> : <></>}
              {this.data.evolution.map((e, i) => <EvolutionBranch data={e} key={`evo-${i}`}/>)}
            </td>
          </tr></tbody></table>

        </details>

      </div>

    );
  }
}
