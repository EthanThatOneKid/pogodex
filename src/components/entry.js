// Dependencies
import React, {Component} from 'react';

// Helpers
import colors from './helpers/colors.js';

// Components
import Type from './type.js';
import Move from './move.js';
import Stats from './stats.js';
import EvolutionBranch from './evolution-branch.js';

// Export Component
export default class Entry extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.grad = colors[this.data.types[0]];
    this.state = {"display": true};
    console.log(this.data)
  }

  toggle(display) {
    this.setState({
      "display": display // !this.state.display
    });
  }

  render() {
    const style = {
      "div": {
        "backgroundImage": `radial-gradient(#${this.grad[0]}, #${this.grad[1]})`,
        "display": this.state.display ? "inline-block" : "none"
      }
    };
    return (
      <div className="entry" id={this.data.name} style={style.div}>
        <details>
          <summary>
            <img className="icon" src={this.data.icon}></img>
            {this.data.name}
          </summary>
          <div>

            <section>
              {this.data.types.map(t => <Type data={t}/>)}
            </section>

            <section>
              <p>stats:</p>
              <Stats data={this.data.stats}/>
            </section>

            <section>
              <p>fast attacks:</p>
              {this.data.moves.fast.map(m => <Move data={m}/>)}
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
