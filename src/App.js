// Dependencies
import React, {Component} from 'react';
import './App.css';
import dex from './db/latest.json';

// Components
import Entry from './components/entry.js';
import DexSearch from './components/dexsearch.js';

// Helpers
const initDex = (filterNums = []) => {
  return Object.values(dex)
    .reduce((acc, cur, i) => {
      if (filterNums.indexOf(i) === -1) {
        if (i % 3 === 0) acc.push([cur]);
        else acc[acc.length - 1].push(cur);
      }
      return acc;
    }, []);
};

// Export Component
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {data: initDex()};
  }

  updateList(event) {
    const {value: query} = event.target;
    if (!query.length) {
      this.stateChange({data: initDex()});
    } else {
      this.stateChange(({data}) => {
        return {
          "data": data.filter((pkmn, i) => {
            console.log(pkmn, i)
          })
        };
      });
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
      "githubIcon": {
        "width": 24
      }
    };

    return (
      <div>

        <header style={style.header}>
          <table><tbody><tr><td>
            <DexSearch onSearch={this.updateList}/>
          </td><td>
            <h1 style={style.title}>Pogodex</h1>
          </td><td>
            <a href="https://github.com/EthanThatOneKid/pogodex" target="_blank">
              <img style={style.githubIcon} src="https://simpleicons.org/icons/github.svg" alt="GitHub Icon"></img>
            </a>
          </td></tr></tbody></table>
        </header>

        <table>
          <tbody>
            {
              this.state.data
                .map(row => {
                  return (
                    <tr>
                      {
                        row
                          .map(pkmn => {
                            return (
                              <td>
                                <Entry data={pkmn}/>
                              </td>
                            )

                          })
                      }
                    </tr>
                  )
                })
            }
          </tbody>
        </table>

      </div>
    );

  }

}
