import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
      </Switch>
    </div>
  );
}

export default App;
