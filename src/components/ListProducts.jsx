import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

class ListProducts extends Component {
  render() {
    const { searchedProducts } = this.props;
    return (
      <div>
        <section>
          {searchedProducts.length === 0 ? <h4>Nenhum produto foi encontrado</h4>
            : (
              searchedProducts.map((product) => (
                <div key={ product.id } data-testid="product">
                  <span>{ product.title }</span>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{ product.price }</p>
                </div>
              ))) }
        </section>
      </div>
    );
  }
}

ListProducts.propTypes = {
  searchedProducts: arrayOf(shape({
    id: string,
    title: string,
    thumbnail: string,
    price: number,
  })).isRequired,
};

export default ListProducts;
