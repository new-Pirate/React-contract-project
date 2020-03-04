import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';

import { store } from '../store/store';
import { Login, Test } from '../pages';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} >
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Test} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
