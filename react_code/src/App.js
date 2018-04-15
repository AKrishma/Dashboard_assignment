import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BoardList from './components/BoardList' ;
import CreateBoard from './components/CreateBoard' ;
import List from './components/List' ;
import Task from './components/Task' ;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardColln: [],
      error: ""
    }
  }

  /* componentDidMount() {
    let query = `{ boards { boardName } }`;
    request('/', query)
    .then(data => this.setState({ boardColln: data.boards }))
    .catch(err => this.setState({ error: err }));
  } */


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h2>{ "React + Graphql Integration: Display Boards" }  </h2>
        <BoardList />
        <CreateBoard />
        {/* <List />
        <Task /> */}
       
      </div>
    );
  }
}

export default App;
