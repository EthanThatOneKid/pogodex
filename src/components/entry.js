// Dependencies
import React, {Component} from 'react';

// Helpers
import colors from './helpers/colors.js';

// Components
import Move from './move.js';
import Stats from './stats.js';
import EvolutionBranch from './evolution-branch.js';

// Export Component
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
        // "width": "7vw",
        "margin": "0",
        "position": "relative",
        "backgroundImage": `radial-gradient(#${this.grad[0]}, #${this.grad[1]})`
      },
    };
    return (
      <div id={this.data.name} style={style.div}>
        <img className="icon" src={this.data.icon}></img>
        <details>
          <summary>{this.data.name}</summary>
          <div>

            <section>
              {
                // make Type class
                this.data.types.map(t => {
                  const c = colors[t][0];
                  return <img src={`https://img.shields.io/badge/type-${t}-${c}.svg`}></img>;
                })
              }
            </section>

            <section>
              <p>stats:</p>
              <Stats data={this.data.stats}/>
            </section>

            <section>
              <p>fast attacks:</p>
              {this.data.moves.quick.map(m => <Move data={m}/>)}
              <p>charge moves:</p>
              {this.data.moves.charge.map(m => <Move data={m}/>)}
            </section>

            <section>
              {(!!this.data.evolution.length) ? <p>evolution:</p> : <></>}
              {this.data.evolution.map(e => <EvolutionBranch data={e}/>)}
            </section>

          </div>

        </details>
      </div>
    );
  }
}
