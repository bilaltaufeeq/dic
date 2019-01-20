import React, { Component } from 'react';
import './App.css';
import CreateDictionary from './components/CreateDictionary'
import DictionaryList from './components/DictionaryList'
import EditDictionary from './components/EditDictionary'
import { Provider } from 'react-redux';
import store from './store/store'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={DictionaryList} />
            <Route exact path="/create-dictionary" component={CreateDictionary} />
            <Route exact path="/edit/:d_id" component={EditDictionary} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
