import React from 'react';

import './styles.scss';
import { Link, Switch, Route } from 'react-router-dom';

const About: React.FC = () => (
  <div className="about">
    <h1>About</h1>
    <p>You are on the about page</p>
  </div>
);

const Home: React.FC = () => (
  <div className="home">
    <h1>Home</h1>
    <p>You are home</p>
  </div>
);

const NoMatch: React.FC = () => (
  <div className="no-match">
    <h1>404</h1>
    <p>No match</p>
  </div>
);

const Main: React.FC = () => (
  <div className="main">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default Main;
