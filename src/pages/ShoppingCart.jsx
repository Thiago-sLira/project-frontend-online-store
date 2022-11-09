import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
  };

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        {cartItems.length === 0 && (
          <h4
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h4>)}

      </div>
    );
  }
}

export default ShoppingCart;
