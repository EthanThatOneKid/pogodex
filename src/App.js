// Dependencies
import React, {Component} from 'react';
import GithubCorner from 'react-github-corner';
import './App.css';
import dex from './db/latest.json';

// Components
import Entry from './components/entry.js';

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
      this.setState({"data": siftedDex});
    }
  }

  render() {

    return (
      <div>

        <GithubCorner
          href="https://github.com/EthanThatOneKid/pogodex"
          octoColor="#333333"
          bannerColor="#fff"
        />

        <header class="page-header">
          <h1 class="page-title">Pogodex</h1>
          <input
            class="page-search"
            type="text"
            placeholder="search..."
            rel="noopener noreferrer"
            onChange={this.updateList.bind(this)}
          />
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

        <footer class="page-header">
          <small>
            Engineered with 💖 by © EthanThatOneKid {(new Date()).getFullYear()}
          </small>
          <br></br>
          <small>
            <a href="https://www.reddit.com/user/ethanthatonekid">u/EthanThatOneKid</a>
            {" | "}
            <a href="https://www.github.com/ethanthatonekid">@EthanThatOneKid</a>
          </small>

        </footer>

      </div>
    );

  }

}
