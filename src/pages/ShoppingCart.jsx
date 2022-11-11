import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
  };

  componentDidMount() {
    this.restoreCartProducts();
  }

  restoreCartProducts = () => {
    const getCartProducts = JSON.parse(localStorage.getItem('cart'));
    if (getCartProducts) {
      this.setState({ cartItems: getCartProducts });
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
          cartItems.map((product) => (
            <div key={ product.id }>
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
