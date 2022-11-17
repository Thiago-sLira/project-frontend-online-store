import React, { Component } from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';

class ListProducts extends Component {
  render() {
    const { searchedProducts, addProductToCart } = this.props;
    return (
      <div>
        <section>
          {searchedProducts.length === 0 ? <h4>Nenhum produto foi encontrado</h4>
            : (
              searchedProducts.map((product) => (
                <div key={ product.id } data-testid="product">
                  <Link data-testid="product-detail-link" to={ `/${product.id}` }>
                    Produto Detalhado
                  </Link>
                  <span>{ product.title }</span>
                  <img src={ product.thumbnail } alt={ product.title } />
                  { product.shipping.free_shipping && (
                    <p data-testid="free-shipping">Frete Grátis</p>
                  ) }
                  <p>{ product.price }</p>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    onClick={ addProductToCart }
                    id={ product.id }
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))) }
        </section>
      </div>
    );
  }
}

ListProducts.propTypes = {
  addProductToCart: func.isRequired,
  searchedProducts: arrayOf(shape({
    id: string,
    title: string,
    thumbnail: string,
    price: number,
  })).isRequired,
};

export default ListProducts;
