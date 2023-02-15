import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditRecipeForm from "../EditRecipeForm";
import './addRecipe.scss';

const AddRecipe = () => {

  const recipeDetails = useSelector(state => state.addRecipeReducer.details);
  const [newRecipeDetails, setNewRecipeDetails] = useState({
    id: '',
    country: '',
    category: '',
    instructions: '',
    name: '',
    tags: '',
    ingredients: [],
    picture: '',
    video: ''
  });
  

  useEffect(() => {
    try {
      if (!recipeDetails) {
        return
      } else {
        setNewRecipeDetails({
          id: recipeDetails.id,
          country: recipeDetails.country,
          category: recipeDetails.category,
          instructions: recipeDetails.instructions,
          name: recipeDetails.name,
          tags: recipeDetails.tags,
          ingredients: recipeDetails.ingredients,
          picture: recipeDetails.picture,
          video: recipeDetails.video
        })
      }
    }
    catch {
      alert('There was an error uploading this recipe. Please refresh the page')
    }
  }, [recipeDetails]);

  return (
    <div data-testid="AddRecipe" className="add__wrapper">
      <h3>Add your own recipe, or edit an uploaded one</h3>
      {recipeDetails && <EditRecipeForm recipeDetails={newRecipeDetails}/>}
    </div>
  )
}

export default AddRecipe;