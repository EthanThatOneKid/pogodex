// Dependencies
import React, {Component} from 'react';

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
      <p>
        {
          this.evolutionMethod
            .map(([displayName, key, clean], i) => {
              const value = clean(this.data[key]);
              const src = `https://img.shields.io/badge/${displayName}-${value}-green.svg`;
              const plus = (i + 1 < this.evolutionMethod.length) ? "+" : "";
              return <span><img src={src}></img>{plus}</span>;
            })
        }
        <span> → <a href={`#${this.data.evolution}`}>{this.data.evolution}</a></span>
      </p>
    );
  }

}
