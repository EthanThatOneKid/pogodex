import React, {Component} from 'react';
import './App.css';

//import Entry from './components/entry.js';
import MasterParser from './components/helpers/master_parser.js';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.master = new MasterParser();
    this.state = {
      "dex": {}
    };
    this.loadDex();
  }

  async loadDex() {
    this.setState({
      "dex": await this.master.init()
    });
  }

  render() {
    return (
      <div className="App">
        {
          Object.values(this.state.dex).map(p => {
            return (
              <img key={p.name} src={p.icon}></img>
            );
          })
        }
      </div>
    );
  }
}
