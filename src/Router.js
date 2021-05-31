import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/404/NotFound.js';
import CreateVideogame from './components/home/CreateVideogame';
import { DetailVideogame } from './components/home/DetailVideogame';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/create-videogame" component={CreateVideogame}/>
      <Route exact path="/detail/:id" component={DetailVideogame} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
