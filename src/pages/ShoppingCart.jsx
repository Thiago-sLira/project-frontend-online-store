import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
    cartItemsReduced: [],
  };

  componentDidMount() {
    this.restoreCartProducts();
    this.reduceCartItems();
  }

  sortCartItems = () => {
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
    this.setState({ cartItemsReduced: itemsSorted }, this.reduceCartItems);
  };

  reduceCartItems = () => {
    const { cartItemsReduced } = this.state;
    const result = cartItemsReduced.reduce((previousValue, currentValue) => {
      if (previousValue.some(({ id }) => id === currentValue.id)) {
        return [...previousValue];
      }
      return [...previousValue, currentValue];
    }, []);
    const mapFirst = result.map(({ id }) => {
      const map = cartItemsReduced.reduce((previousValue, currentValue) => {
        if (currentValue.id === id) return previousValue + 1;
        return previousValue;
      }, 0);
      return map;
    });
    const mapSecond = result.map((obj, index) => {
      obj.quantity = mapFirst[index];
      return obj;
    });
    this.setState({ cartItemsReduced: mapSecond });
  };

  restoreCartProducts = () => {
    const getCartProducts = JSON.parse(localStorage.getItem('cart'));
    if (getCartProducts) {
      this.setState({ cartItems: getCartProducts }, this.sortCartItems);
    }
  };

  render() {
    const { cartItemsReduced } = this.state;
    return (
      <div>
        {cartItemsReduced.length === 0 ? (
          <h4
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h4>) : (
          cartItemsReduced.map((product, index) => (
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
