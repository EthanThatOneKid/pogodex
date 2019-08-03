// Dependencies
import React, {Component} from 'react';
import KeyVal from './keyval';

// Export Component
export default class EvolutionBranch extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.evolutionMethod = [
      ["Candy Cost",     "candyCost",                  v => `${v} ${this.data.candy} candies`, this.data.hasOwnProperty("candyCost")],
      ["Buddy Distance", "kmBuddyDistanceRequirement", v => `${v}km`, this.data.hasOwnProperty("kmBuddyDistanceRequirement")],
      ["Evolution Item", "evolutionItemRequirement",   v => `${v.replace(/ITEM_/i, "")}`, this.data.hasOwnProperty("evolutionItemRequirement")]
    ].filter(p => p[3]);
  }

  render() {
    return (
      <p key="evolution-branch">
        {
          this.evolutionMethod
            .map(([displayName, key, clean], i) => {
              const value = clean(this.data[key]),
                    plus = (i + 1 < this.evolutionMethod.length) ? "+" : "";
              return (
                <span key={`evomethod-${i}`}>
                  <KeyVal k={displayName} v={value}></KeyVal>
                  {plus}
                </span>
              );
            })
        }
        <span> → <a href={`#${this.data.evolution}`}>{this.data.evolution}</a></span>
      </p>
    );
  }

}
