import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HomePage extends Component {
  state = {
    searchInput: '',
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

  render() {
    const { searchInput } = this.state;
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
          />
        </label>

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
