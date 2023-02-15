import { cleanup, screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../store';
import addRecipeActions from '../../store/actions/addRecipeActions';
import RecipesList from './RecipesList';

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
  test('should render RecipesList component', () => {
    render(
      <Provider store={store}>
        <RecipesList />
      </Provider>
    );
    const RecipesListComponent = screen.getByTestId('RecipesList');
    expect(RecipesListComponent).toBeInTheDocument();
  });
});

test('should add new recipe and display it in the list', () => {
  const newRecipe = {
    ...blankRecipe,
    name: 'Lasagna',
    id: 123
  };
  store.dispatch(addRecipeActions.addToLocal(newRecipe));
  render(
    <Provider store={store}>
      <Router>
        <RecipesList />
      </Router>
    </Provider>
  );
  expect(screen.getByText('Lasagna')).toBeInTheDocument();
});  

test('should change recipe name in the list', () => {
  const newRecipe = {
    ...blankRecipe,
    id: 123,
    name: 'Lasagna'
  };
  const newRecipeChanged = {
    ...newRecipe,
    id: 123,
    name: 'Pasta'
  }
  store.dispatch(addRecipeActions.addToLocal(newRecipe));
  store.dispatch(addRecipeActions.addToLocal(newRecipeChanged));
  render(
    <Provider store={store}>
      <Router>
        <RecipesList />
      </Router>
    </Provider>
  );
  expect(screen.getByText('Pasta')).toBeInTheDocument();
  expect(screen.queryByText('Lasagna')).not.toBeInTheDocument();
});  

test('should update recipe tags and country of origin', () => {
  const newRecipe = {
    ...blankRecipe,
    id: 123,
    name: 'Lasagna'
  };
  const newRecipeChanged = {
    ...newRecipe,
    id: 123,
    tags: 'dinner',
    country: 'italian'
  }
  store.dispatch(addRecipeActions.addToLocal(newRecipe));
  store.dispatch(addRecipeActions.addToLocal(newRecipeChanged));
  render(
    <Provider store={store}>
      <Router>
        <RecipesList />
      </Router>
    </Provider>
  );
  expect(screen.getByText('Tags: dinner')).toBeInTheDocument();
  expect(screen.getByText('Country of origin: italian')).toBeInTheDocument();
  expect(screen.getByText('Lasagna')).toBeInTheDocument();
});  

test('should remove Pasta recipe from the list', () => {
  const newRecipe1 = {
    ...blankRecipe,
    id: 123,
    name: 'Lasagna'
  };
  const newRecipe2 = {
    ...blankRecipe,
    id: 124,
    name: 'Pasta'
  };
  const newRecipe3 = {
    ...blankRecipe,
    id: 125,
    name: 'Pizza'
  };
  store.dispatch(addRecipeActions.addToLocal(newRecipe1));
  store.dispatch(addRecipeActions.addToLocal(newRecipe2));
  store.dispatch(addRecipeActions.addToLocal(newRecipe3));
  store.dispatch(addRecipeActions.removeFromLocal(124));
  render(
    <Provider store={store}>
      <Router>
        <RecipesList />
      </Router>
    </Provider>
  );
  expect(screen.getByText('Lasagna')).toBeInTheDocument();
  expect(screen.getByText('Pizza')).toBeInTheDocument();
  expect(screen.queryByText('Pasta')).not.toBeInTheDocument();
});  

test('should remove all recipes but still render RecipesList component', () => {
  store.dispatch(addRecipeActions.removeFromLocal(123));
  store.dispatch(addRecipeActions.removeFromLocal(125));
  render(
    <Provider store={store}>
      <Router>
        <RecipesList />
      </Router>
    </Provider>
  );
  const RecipesListComponent = screen.getByTestId('RecipesList');
  expect(RecipesListComponent).toBeInTheDocument();
});

test('RecipesList matches snapshot', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <RecipesList />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});