import { cleanup, screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../store';
import EditRecipeForm from './EditRecipeForm';

afterEach(() => {
  cleanup();
});

const blankRecipe = {
  id: '',
  country: '',
  category: '',
  instructions: '',
  name: '',
  tags: '',
  ingredients: [['','']],
  picture: '',
  video: ''
};

describe('test if component is rendered on the page', () => {

  test('should render EditRecipeForm component', () => {
    const details = {
      ...blankRecipe
    };
    render(
      <Provider store={store}>
        <Router>
          <EditRecipeForm recipeDetails={details} />
        </Router>
      </Provider>
    );
    const EditRecipeFormComponent = screen.getByTestId('EditRecipeForm');
    expect(EditRecipeFormComponent).toBeInTheDocument();
  });
});

test('should render RecipeVideo component inside EditRecipeForm component when url is passed', () => {
  const details = {
    ...blankRecipe,
    video: 'https://www.youtube.com/watch?v=kYH2qJXnSMo'
  };
  render(
    <Provider store={store}>
      <Router>
        <EditRecipeForm recipeDetails={details}/>
      </Router>
    </Provider>
  );
  const iFrame = screen.getByTestId('RecipeVideo');
  expect(iFrame).toBeInTheDocument();
});

test('EditRecipeForm matches snapshot', () => {
  const details = {
    ...blankRecipe,
  };
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <EditRecipeForm recipeDetails={details}/>
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});