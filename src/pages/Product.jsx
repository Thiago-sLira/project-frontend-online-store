import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById, handleLocalStorage } from '../services/api';

class Product extends Component {
  state = {
    product: {},
    emailInput: '',
    textareaInput: '',
    checkboxInput: [false, false, false, false, false],
    errorMessage: false,
    evaluations: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const resultId = await getProductById(id);
    this.setState({ product: resultId }, () => this.handleEvaluations(resultId));
  }

  handleCartRedirection = () => {
    const { history } = this.props;
    history.push('/shoppingcart');
  };

  addProductToCart = () => {
    const { product } = this.state;
    handleLocalStorage(product);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleCheckboxAvaliation = ({ target: { id } }) => {
    const { checkboxInput } = this.state;
    for (let index = id; index >= 0; index -= 1) {
      checkboxInput[index] = true;
    }
    for (let index = checkboxInput.length - 1; index > id; index -= 1) {
      checkboxInput[index] = false;
    }
    // if (checkboxInput[id]) {
    //   checkboxInput[id] = false;
    // } else {
    //   checkboxInput[id] = true;
    // }
    this.setState({ checkboxInput });
  };

  handleAvaliationFormButton = () => {
    const { emailInput, textareaInput, checkboxInput, product } = this.state;
    const validateFields = emailInput.length > 0 && textareaInput.length > 0;
    const validateRating = checkboxInput.includes(true);
    if (!validateFields || !validateRating) {
      this.setState({ errorMessage: true });
    } else {
      const evaluation = {
        email: emailInput,
        text: textareaInput,
        rating: checkboxInput };
      localStorage.setItem(product.id, JSON.stringify(evaluation));
      this.setState({
        errorMessage: false,
        emailInput: '',
        textareaInput: '',
        checkboxInput: [false, false, false, false, false],
      });
    }
  };

  handleEvaluations = (product) => {
    // const { product, evaluations } = this.state;
    const restoredEvaluation = JSON.parse(localStorage.getItem(product.id));
    this.setState({ evaluations: [restoredEvaluation] });
  };

  render() {
    const { product: { title, price, thumbnail },
      textareaInput, emailInput, checkboxInput, errorMessage, evaluations } = this.state;
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
        <fieldset>
          <legend>Avaliações</legend>
          <form>
            <label htmlFor="email">
              <input
                data-testid="product-detail-email"
                type="email"
                placeholder="Email"
                id="email"
                name="emailInput"
                value={ emailInput }
                onChange={ this.handleChange }

              />
            </label>

            <label htmlFor="Message" data-testid="product-detail-evaluation">
              <input
                type="textarea"
                placeholder="Mensagem opcional"
                id="Message"
                name="textareaInput"
                value={ textareaInput }
                onChange={ this.handleChange }
              />
            </label>
            {
              checkboxInput.map((box, index) => (
                <label htmlFor={ index } key={ index }>
                  <input
                    data-testid={ `${index}-rating` }
                    type="checkbox"
                    id={ index }
                    checked={ box }
                    onChange={ this.handleCheckboxAvaliation }
                  />
                </label>
              ))
            }
            <button
              data-testid="submit-review-btn"
              type="button"
              onClick={ this.handleAvaliationFormButton }
            >
              Avaliar
            </button>
          </form>
        </fieldset>
        { errorMessage && <h4 data-testid="error-msg">Campos inválidos</h4>}
        { evaluations.length > 0

        && (

          <div>
            <span data-testid="review-card-email">
              { evaluations[0].email}
              {' '}
            </span>
            <span
              data-testid="review-card-evaluation"
            >
              {evaluations[0].text}
            </span>
            {evaluations[0].rating.map((box, index) => (
              <label data-testid="review-card-rating" htmlFor={ index } key={ index }>
                <input
                  disabled
                  type="checkbox"
                  id={ index }
                  checked={ box }
                />
              </label>
            ))}
          </div>
        )}
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
