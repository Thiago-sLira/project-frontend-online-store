import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import ShoppingCart from './pages/ShoppingCart';
import Product from './pages/Product';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route exact path="/:id" component={ Product } />
      </Switch>
    </div>
  );
}

export default App;
