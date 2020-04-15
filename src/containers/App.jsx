import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import { store } from '../store/store';

import { Login } from '../pages';
import AppLayout from './AppLayout/AppLayout';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} >
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={AppLayout} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
