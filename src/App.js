import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home, About, Contact, Login, Register } from './views';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ Home } exact/>
        <Route path="/about" component={ About } />
        <Route path="/contact" component={ Contact } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
      </Switch>
    </Router>
  );
}

export default App;
