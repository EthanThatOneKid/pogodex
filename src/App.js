// Dependencies
import React, {Component} from 'react';
import './App.css';

// Components
import Entry from './components/entry.js';
import MasterParser from './components/helpers/master_parser.js';

// Export Component
export default class App extends Component {

  constructor(props) {
    super(props);
    this.master = new MasterParser();
    this.state = {"dex": {}};
    this.loadDex();
  }

  async loadDex() {
    this.setState({
      "dex": await this.master.init()
    });
  }

  render() {
    return Object.values(this.state.dex)
      .map(p => <Entry data={p}/>);
    // return (
    //   <div className="App">
    //     {
    //       Object.values(this.state.dex)
    //         .map(p => <Entry data={p}/>)
    //     }
    //   </div>
    // );
  }
}
