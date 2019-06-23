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
      <p key="evolution-branch">
        {
          this.evolutionMethod
            .map(([displayName, key, clean], i) => {
              const value = clean(this.data[key]),
                    src = `https://img.shields.io/badge/${displayName}-${value}-green.svg`,
                    plus = (i + 1 < this.evolutionMethod.length) ? "+" : "",
                    alt = `${displayName} ${plus}`;
              return (
                <span key={`evomethod-${i}`}>
                  <img src={src} alt={alt}></img>
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
