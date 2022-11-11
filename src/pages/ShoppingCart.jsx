import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
    // cartItemsReduced: [],
  };

  componentDidMount() {
    this.restoreCartProducts();
    this.reduceCartItems();
  }

  reduceCartItems = () => {
    const { cartItems } = this.state;
    const MINUS_ONE = -1;
    const itemsSorted = cartItems
      .sort((a, b) => {
        if ((a.id > b.id)) {
          return 1;
        }
        if (b.id > a.id) {
          return MINUS_ONE;
        }
        return 0;
      });
    console.log(itemsSorted);
  };

  restoreCartProducts = () => {
    const getCartProducts = JSON.parse(localStorage.getItem('cart'));
    if (getCartProducts) {
      this.setState({ cartItems: getCartProducts }, this.reduceCartItems);
    }
  };

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        {cartItems.length === 0 ? (
          <h4
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h4>) : (
          cartItems.map((product, index) => (
            <div key={ `${product.id}${index}` }>
              <img src={ product.thumbnail } alt={ product.title } />
              <h6 data-testid="shopping-cart-product-name">{ product.title }</h6>
              <h6>{ product.price }</h6>
            </div>
          ))
        )}

      </div>
    );
  }
}

export default ShoppingCart;
