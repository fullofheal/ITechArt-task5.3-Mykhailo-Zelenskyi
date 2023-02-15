import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import RecipeVideo from '../RecipeVideo/';
import addRecipeActions from "../../store/actions/addRecipeActions";
import { useNavigate } from "react-router-dom";
import './EditRecipeForm.scss';

const EditRecipeForm = (props) => {

  const {recipeDetails} = props;

  const [details, setDetails] = useState(recipeDetails);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setDetails(recipeDetails);
  }, [recipeDetails])

  const addIngredient = () => {
    setDetails({
      ...details,
      ingredients: [...details.ingredients, ['', '']]
    })
  }

  const deleteIngredient = (i) => {
    const filteredIngredients = details.ingredients.filter((item, index) => index !== i);
    setDetails({
      ...details,
      ingredients: filteredIngredients
    })
  }

  const changeImgUrl = (e) => {
    try {
      setDetails({
        ...details,
        picture: e.target.value
      })
    }
    catch {
      console.log('please set correct image url')
    }
  }

  const changeVideoUrl = (e) => {
    setDetails({
      ...details,
      video: e.target.value
    })
  }

  const submitRecipe = (e) => {
    e.preventDefault();
    dispatch(addRecipeActions.addToLocal(details));
    if (props) {
      navigate("/");
    }
  }

  const ingredientsList = (ingredients) => {
    return ingredients.map((ingredient, i) => {
      return <div key={`ingredient${i+1}`} className="form__ingredient">
        <div>
          <input 
            required 
            type="text"
            name={ingredient[0]}
            placeholder="enter ingredient name"
            pattern="[^#$^&*?><\/0-9]+"
            value={details.ingredients.find((item, index) => index === i)[0]}
            onChange={(e) => {
              setDetails({
                ...details,
                ingredients: details.ingredients.map((item, index) => {
                  if (index === i) {
                    return [e.target.value, item[1]]
                  }
                  return item
                })
              })
            }} />
          <span>Only letters</span>
        </div>
        <div>
          <input 
            type="text" 
            name={ingredient[0]} 
            placeholder="enter the measure" 
            pattern="[^#$^&*?><]+"
            value={details.ingredients.find((item, index) => index === i)[1]}
            onChange={(e) => {
              setDetails({
                ...details,
                ingredients: details.ingredients.map((item, index) => {
                  if (index === i) {
                    return [item[0], e.target.value]
                  }
                  return item
                })
              })
            }} />
          <span>Invalid symbols used</span>
        </div>
        <button type="button" onClick={() => deleteIngredient(i)}>
          Remove
        </button>
      </div>
    })
  }

  return (
    <form 
      data-testid="EditRecipeForm"
      className="form"
      onSubmit={(e) => submitRecipe(e)}>
      <div className="form__picture">
        <img src={details.picture} alt={details.name}/>
        <label className="form__label" htmlFor="picture-url">Picture url</label>
        <input 
        type="text"
        name='picture-url'
        placeholder="Provide valid image url"
        value={details.picture}
        onChange={(e) => changeImgUrl(e)} />
      </div>
      <div>
        <label className="form__label" htmlFor="name">Name</label>
        <input 
          required 
          type="text" 
          name='name' 
          pattern="[^#$^&*?><\/0-9]+"
          value={details.name}
          placeholder="Recipe name"
          onChange={(e) => {
            setDetails({
              ...details,
              name: e.target.value
            })
          }}/>
        <span>Only letters</span>
      </div>
      <div>
        <label className="form__label" htmlFor="tags">Tags</label>
        <input 
          type="text" 
          name='tags' 
          pattern="[A-Za-z, ]+"
          value={details.tags}
          placeholder="List associated tags"
          onChange={(e) => {
            setDetails({
              ...details,
              tags: e.target.value
            })
          }}/>
        <span>Only letters</span>
      </div>
      <div>
        <label className="form__label" htmlFor="country">Country of origin</label>
        <input 
          type="text" 
          name='country' 
          pattern="[A-Za-z ]+"
          value={details.country}
          placeholder="List associated tags"
          onChange={(e) => {
            setDetails({
              ...details,
              country: e.target.value
            })
          }}/>
        <span>Only letters</span>
      </div>
      <label className="form__label" htmlFor="instructions">Instructions</label>
      <textarea 
        required
        className="form__instructions"
        name='instructions' 
        placeholder="Provide detailed preparation instructions"
        value={details.instructions}
        onChange={(e) => {
          setDetails({
            ...details,
            instructions: e.target.value
          })
        }}/>
      <div className="add-form__ingredients">
        {details.ingredients.length > 0 ? ingredientsList(details.ingredients) : ''}
        <button 
          type="button" 
          onClick={() => addIngredient()}>
          Add new ingredient
        </button>
      </div>
      <label className="form__label-video" htmlFor="video-url">Video url</label>
      <input 
        type="text" 
        name="video-url"
        value={details.video}
        onChange={(e) => changeVideoUrl(e)}/>
      {details.video && <RecipeVideo videoUrl={details.video} /> }
        <button type="submit">Submit recipe</button>
    </form>
  )
}

export default EditRecipeForm;