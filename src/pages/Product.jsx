import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById, handleLocalStorage } from '../services/api';

class Product extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const resultId = await getProductById(id);
    this.setState({ product: resultId });
  }

  handleCartRedirection = () => {
    const { history } = this.props;
    history.push('/shoppingcart');
  };

  addProductToCart = () => {
    const { product } = this.state;
    handleLocalStorage(product);
  };

  render() {
    const { product: { title, price, thumbnail } } = this.state;
    return (
      <div>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleCartRedirection }
        >
          Ver Carrinho
        </button>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <h3 data-testid="product-detail-name">{ title }</h3>
        <h4 data-testid="product-detail-price">
          {' '}
          {`R$ ${price}` }
        </h4>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.addProductToCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Product;
