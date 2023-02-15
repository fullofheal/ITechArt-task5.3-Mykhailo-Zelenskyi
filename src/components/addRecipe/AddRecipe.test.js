import { cleanup, screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../store';
import addRecipeActions from '../../store/actions/addRecipeActions';
import AddRecipe from './AddRecipe';
import RecipesList from '../recipesList/RecipesList';

afterEach(() => {
  cleanup();
});

const customRecipe = {
  id: 777,
  country: 'customCountry',
  category: 'customCategory',
  instructions: 'custom instructions',
  name: 'customName',
  tags: 'customTag',
  ingredients: [['custom ingredient','custom measure']],
  picture: 'customUrl',
  video: 'customUrl'
};

describe('test if component is rendered on the page', () => {
  test('should render AddRecipe component', () => {
    render(
      <Provider store={store}>
        <AddRecipe />
      </Provider>
    );
    const addRecipeComponent = screen.getByTestId('AddRecipe');
    expect(addRecipeComponent).toBeInTheDocument();
  });
});


  
test('should add custom recipe and display in the list', () => {
  const recipe = {
    ...customRecipe
  };
  store.dispatch(addRecipeActions.addToLocal(recipe));
  render(
    <Provider store={store}>
      <Router>
        <RecipesList />
      </Router>
    </Provider>
  );
  expect(screen.getByText('customName')).toBeInTheDocument();
  expect(screen.getByText('Country of origin: customCountry')).toBeInTheDocument();
  expect(screen.getByText('Tags: customTag')).toBeInTheDocument();
});  

test('should properly update addRecipeReducer with fetched selected recipe details', () => {
  const fetchedRecipe = {
    idMeal: 777,
    strMeal: 'customName',
    strArea: 'customCountry',
    strCategory: 'customCategory',
    strInstructions: 'custom instructions',
    strIngredient1: 'custom ingredient',
    strMeasure1: 'custom measure',
    strMealThumb: 'customUrl',
    strYoutube: 'customUrl',
    strTags: 'customTag'
  };
  const transformedRecipe = {
    ...customRecipe
  };
  store.dispatch(addRecipeActions.addRecipeFetched(fetchedRecipe));
  const reducerDetails = store.getState().addRecipeReducer.details;
  expect(reducerDetails).toEqual(transformedRecipe);    
});

test('AddRecipe matches snapshot', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <AddRecipe />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
