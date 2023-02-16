import { useState } from "react";
const AddEditRecipeForm = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [ingredientName, setIngredientName] = useState("");

  const handleAddIngredient = (e) => {
    if (e.key && e.key !== "Enter") {
      return;
    }
    e.preventDefault();

    if (!ingredientName) {
      alert("missing ingredient field, please doulbe check");
      return;
    }

    setIngredients([...ingredients, ingredientName]);
    setIngredientName("");
  };

  const handleRecipeFormSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length === 0) {
      alert("Ingredients cannot be empty add one please");
      return;
    }
    const isPublished = new Date(publishDate) <= new Date() ? true : false;
    const newRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      isPublished,
      ingredients,
    };
    props.handleAddRecipe(newRecipe);
  };

  return (
    <form
      onSubmit={handleRecipeFormSubmit}
      className="add-edit-recipe-form-container"
    >
      <h2>Add a New Recipe</h2>
      <div className="top-form-section">
        <div className="fields">
          <label className="recipe-label input-label">
            Recipe Name:
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-text"
            ></input>
          </label>
          <label className="recipe-label input-label">
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select"
              required
            >
              <option value=""></option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="sides">Sides</option>
              <option value="drinks">Drinks</option>
            </select>
          </label>
          <label className="recipe-label input-label">
            Directions:
            <textarea
              required
              value={directions}
              onChange={(e) => {
                setDirections(e.target.value);
              }}
              className="input-text directions"
            ></textarea>
          </label>
          <label className="recipe-label input-label">
            Publish Date:
            <input
              type="date"
              required
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="input-text"
            />
          </label>
        </div>
      </div>
      <div className="ingredients-list">
        <h3 className="text-center">Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th className="table-header">Ingredient</th>
              <th className="table-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingredients && ingredients.length > 0
              ? ingredients.map((ingredient) => {
                  return (
                    <tr key={ingredient}>
                      <td className="table-data text-center">{ingredient}</td>
                      <td className="ingredient-delete-box">
                        <button
                          type="button"
                          className="secondary-button ingredient-delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {!ingredients && ingredients.length === 0 ? (
          <h3 className="text-center no-ingredients">
            No Ingredients Added Yet
          </h3>
        ) : null}
        <div className="ingredient-form">
          <label className="ingredient-label">
            Ingredient:
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => {
                setIngredientName(e.target.value);
              }}
              className="input-text"
              placeholder="ex sugar"
              onKeyPress={handleAddIngredient}
            />
          </label>
          <button
            type="button"
            className="primary-button add-ingredient-button"
            onClick={handleAddIngredient}
          >
            {" "}
            Add Ingredient
          </button>
        </div>
      </div>
      <div className="action-buttons">
        <button type="submit" className="primary-button action-button">
          Create Recipe
        </button>
      </div>
    </form>
  );
};

export default AddEditRecipeForm;
