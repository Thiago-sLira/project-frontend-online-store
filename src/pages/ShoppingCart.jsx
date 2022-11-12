import React, { Component } from 'react';
import { handleLocalStorage } from '../services/api';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
    cartItemsReduced: [],
  };

  componentDidMount() {
    this.restoreCartProducts();
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
    const result = cartItemsReduced.reduceRight((previousValue, currentValue) => {
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

  incrementProductToCart = ({ target: { value } }) => {
    const { cartItems } = this.state;
    const { index, quantity, available_quantity: maxQuantity } = JSON.parse(value);
    if (quantity < maxQuantity) {
      const find = cartItems.find((item) => item.index === Number(index));
      handleLocalStorage(find);
    }
    this.restoreCartProducts();
  };

  decrementProductFromCart = ({ target: { value } }) => {
    const { quantity, index } = JSON.parse(value);
    const { cartItems } = this.state;
    if (quantity > 1) {
      const productsNotRemoved = cartItems.filter((item) => Number(index) !== item.index);
      localStorage.setItem('cart', JSON.stringify(productsNotRemoved));
    }
    this.restoreCartProducts();
  };

  removeProductFromCart = ({ target: { value } }) => {
    const { cartItems } = this.state;
    const productsNotRemoved = cartItems.filter((product) => value !== product.id);
    localStorage.setItem('cart', JSON.stringify(productsNotRemoved));
    this.restoreCartProducts();
  };

  render() {
    const { cartItemsReduced } = this.state;
    return (
      <div>
        <div>
          {cartItemsReduced.length === 0 ? (
            <h4
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </h4>) : (
            cartItemsReduced.map((product, index) => (
              <div key={ `${product.id}${index}` }>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ this.removeProductFromCart }
                  value={ product.id }
                >
                  X
                </button>
                <img src={ product.thumbnail } alt={ product.title } />
                <h6 data-testid="shopping-cart-product-name">{ product.title }</h6>
                <h6>{ product.price }</h6>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ this.decrementProductFromCart }
                  value={ JSON.stringify(product) }
                >
                  -
                </button>
                <span>
                  Quantidade no carrinho:
                  <span data-testid="shopping-cart-product-quantity">
                    {product.quantity}
                  </span>
                </span>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ this.incrementProductToCart }
                  value={ JSON.stringify(product) }
                >
                  +
                </button>
              </div>
            ))
          )}

        </div>
        <button type="button">Finalizar Compra</button>
      </div>
    );
  }
}

export default ShoppingCart;
