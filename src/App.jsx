import React from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Home from './components/Home';
import Report from './components/Report';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/report" component={Report} />
    </Switch>
  );
}

export default App;
