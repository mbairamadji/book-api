import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      count : 0
    }
  }
  
  tick = () => {
    this.setState( prevState => { count : prevState.count + 1 })
  }
  
  increment = () => {
    this.setState({ count : this.state.count + 1})
  }
  decrement = () => {
    this.setState({ count : this.state.count - 1})
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to My App</h1>
        </header>
        <div>
          <button onClick={this.increment}> Increment +  </button>
          <p>{this.state.count}</p>
        </div>
        <div>
          <button onClick={this.decrement}> Decrement -  </button>
        </div>
      </div>
    );
  }
}

export default App;
