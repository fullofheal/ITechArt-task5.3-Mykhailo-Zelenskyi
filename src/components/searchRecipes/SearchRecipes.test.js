import { cleanup, screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from "../../store";
import SearchRecipes from "./SearchRecipes";

afterEach(() => {
  cleanup();
});

describe('test if component is rendered on the page', () => {
  test('should render SearchRecipes component', () => {
    render(
    <Provider store={store}>
      <SearchRecipes />
    </Provider>
    );
    const SearchRecipesComponent = screen.getByTestId('SearchRecipes');
    expect(SearchRecipesComponent).toBeInTheDocument();
  });
});

test('RecipesList matches snapshot', () => {
  const tree = renderer.create(
    <Provider store={store}>
        <SearchRecipes />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});