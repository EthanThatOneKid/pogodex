// Dependencies
import React, {Component} from 'react';
import './App.css';
import dex from './db/latest.json';

// Components
import Entry from './components/entry.js';

// Export Component
export default class App extends Component {

  constructor(props) {
    super(props);
    this.data = Object.values(dex)
      .reduce((acc, cur, i) => {
        if (i % 3 === 0) acc.push([cur]);
        else acc[acc.length - 1].push(cur);
        return acc;
      }, []);
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {
              this.data
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
