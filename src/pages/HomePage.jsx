import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import ListProducts from '../components/ListProducts';

class HomePage extends Component {
  state = {
    searchInput: '',
    searchedProducts: [],
    productByCategories: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ productByCategories: categories });
  }

  handleClickCategory = async ({ target }) => {
    const category = target.id;
    const gotCategoryProducts = await getProductsFromCategoryAndQuery(category, '');
    this.setState({ searchedProducts: gotCategoryProducts.results });
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
    const { searchInput, searchedProducts, productByCategories } = this.state;
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
        <aside>
          <h3>Categorias</h3>
          <ul>
            {productByCategories.map((category) => (
              <li key={ category.name }>
                <label
                  htmlFor={ category.id }
                  data-testid="category"
                >
                  {category.name}
                  <input
                    type="radio"
                    onClick={ () => this.handleClickCategory(event) }
                    id={ category.id }
                  />
                </label>
              </li>
            ))}
          </ul>
        </aside>
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
