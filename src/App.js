// Dependencies
import React, {Component} from 'react';
import './App.css';
import dex from './db/latest.json';

// Components
import Entry from './components/entry.js';

// Export Component
export default class App extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        {
          Object.values(dex)
            .map(p => <Entry data={p}/>)
        }
      </div>
    );
  }

}
