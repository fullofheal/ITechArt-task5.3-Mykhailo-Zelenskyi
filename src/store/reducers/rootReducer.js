import searchReducer from "./searchReducer";
import addRecipeReducer from "./addRecipeReducer";
import localRecipesReducer from "./localRecipesReducer";
import detailsReducer from './detailsReducer';

const rootReducer = {
  searchReducer,
  addRecipeReducer,
  localRecipesReducer,
  detailsReducer
}

export default rootReducer;