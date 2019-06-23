// Dependencies
import React, {Component} from 'react';
import './App.css';
import dex from './db/latest.json';

// Components
import Entry from './components/entry.js';
// import DexSearch from './components/dexsearch.js';

// Helpers
const initDex = (searchResults = []) => {
  let result = Object.values(dex);
  if (!!searchResults.length) {
    result = result
      .filter((pkmn, i) => searchResults.includes(i));
  }
  return result
    .reduce((acc, cur, i) => {
      if (i % 3 === 0) {
        acc.push([cur]);
      } else {
        acc[acc.length - 1].push(cur);
      }
      return acc;
    }, []);
};

// Export Component
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {"data": initDex()};
  }

  updateList(event) {
    const query = event.target.value.toUpperCase();
    if (!query.length) {
      this.setState({data: initDex()});
    } else {
      const queryMatches = Object.values(dex)
        .reduce((acc, pkmn, i) => {
          const isMatch = pkmn.name.includes(query) || pkmn.types.map(type => type.toUpperCase()).some(type => type.includes(query));
          if (isMatch) {
            acc.push(i);
          }
          return acc;
        }, []);
      const siftedDex = initDex(queryMatches);
      console.log({siftedDex});
      this.setState({"data": siftedDex});
    }
  }

  render() {

    const style = {
      "header": {
        "height": "109px",
        "width": "100%",
        "color": "white"
      },
      "title": {
        "fontSize": "48pt",
        "margin": 0
      },
      "search": {
        "display": "inline-block"
      },
      "githubIcon": {
        "width": 24
      }
    };

    return (
      <div>

        <header style={style.header}>
          <table><tbody><tr><td>
            <input
              type="text"
              placeholder="search..."
              style={style.search}
              rel="noopener noreferrer"
              onChange={this.updateList.bind(this)}
            />
          </td><td>
            <h1 style={style.title}>Pogodex</h1>
          </td><td>
            <a href="https://github.com/EthanThatOneKid/pogodex" target="_blank" rel="noopener noreferrer">
              <img style={style.githubIcon} src="https://simpleicons.org/icons/github.svg" alt="GitHub Icon"></img>
            </a>
          </td></tr></tbody></table>
        </header>

        <table>
          <tbody>
            {
              this.state.data
                .map((row, rowIndex) => {
                  return (
                    <tr key={`row-${rowIndex}`}>
                      {
                        row
                          .map((pkmn, colIndex) => {
                            return (
                              <td key={`(${colIndex},${rowIndex})`}>
                                <Entry data={pkmn} key={pkmn.name}/>
                              </td>
                            );
                          })
                      }
                    </tr>
                  );
                })
            }
          </tbody>
        </table>

      </div>
    );

  }

}
