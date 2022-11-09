import React, { Component } from 'react';

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

  render() {
    const { searchInput } = this.state;
    return (
      <div>
        Home
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
export default HomePage;
