import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ListProducts from '../components/ListProducts';

class HomePage extends Component {
  state = {
    searchInput: '',
    searchedProducts: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/shoppingcart');
  };

  handleSearchButton = async () => {
    const { searchInput } = this.state;
    const search = await getProductsFromCategoryAndQuery('', searchInput);
    this.setState({ searchedProducts: search.results });
  };

  render() {
    const { searchInput, searchedProducts } = this.state;
    return (
      <div>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleClick }
        >
          Cart
        </button>
        {!searchInput && (
          <h4 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>) }
        <label htmlFor="inputSearch">
          <input
            type="text"
            id="inputSearch"
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleChange }
            data-testid="query-input"
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleSearchButton }
        >
          Buscar
        </button>
        <Categories />
        <ListProducts searchedProducts={ searchedProducts } />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomePage;
