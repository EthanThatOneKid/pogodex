// Dependencies
import React, {Component} from 'react';

// Export Component
export default class EvolutionBranch extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
  }

  render() {
    return this.data
      .map(evo => {
        const possibilities =  [
          ["Candy Cost",     "candyCost",                  evo.hasOwnProperty("candyCost")],
          ["Buddy Distance", "kmBuddyDistanceRequirement", evo.hasOwnProperty("kmBuddyDistanceRequirement")],
          ["Evolution Item", "evolutionItemRequirement",   evo.hasOwnProperty("evolutionItemRequirement")]
        ];
        return (
          <p>
            {
              possibilities
                .filter(p => p[2])
                .map(([displayName, key]) => {
                  const src = `https://img.shields.io/badge/${displayName}-${this.data[key]}-green.svg`;
                  return <img src={src}></img>;
                });
            }
            →
            {this.data.evolution}
          </p>
        );
      );
  }

}
