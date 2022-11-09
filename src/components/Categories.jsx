import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categories extends Component {
  state = {
    productByCategories: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ productByCategories: categories });
  }

  handleClickCategory = () => {
    console.log('Deu bom');
  };

  render() {
    const { productByCategories } = this.state;
    return (
      <div>
        <aside>
          <h3>Categorias</h3>
          <ul>
            {productByCategories.map((category) => (
              <li key={ category.id }>
                <label
                  htmlFor={ `input-${category.name}` }
                  data-testid="category"
                >
                  {category.name}
                  <input
                    type="radio"
                    onClick={ this.handleClickCategory }
                    id={ `input-${category.name}` }
                  />
                </label>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    );
  }
}

export default Categories;
