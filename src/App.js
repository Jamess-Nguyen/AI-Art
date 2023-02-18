import "./App.css";
import "./App.scss";
import { useEffect, useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  useEffect(() => {
    fetchRecipes()
      .then((fetchedRecipes) => {
        setRecipes(fetchedRecipes);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  }, [user, categoryFilter]);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  const fetchRecipes = async () => {
    const queries = [];

    if (categoryFilter) {
      queries.push({
        field: "category",
        condition: "==",
        value: categoryFilter,
      });
    }
    if (!user) {
      queries.push({
        field: "isPublished",
        condition: "==",
        value: true,
      });
    }

    let fetchedRecipes = [];
    try {
      const response = await FirebaseFirestoreService.readDocuments({
        collection: "recipes",
        queries: queries,
      });
      const newRecipes = response.docs.map((recipeDoc) => {
        const id = recipeDoc.id;
        const data = recipeDoc.data();
        let seconds = data.publishDate.seconds;
        data.publishDate = new Date(seconds * 1000);
        return { ...data, id };
      });
      fetchedRecipes = [...newRecipes];
    } catch (error) {
      console.error(error.message);
      throw error;
    }
    return fetchedRecipes;
  };

  const handleFetchRecipes = async () => {
    try {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await FirebaseFirestoreService.createDocument({
        collection: "recipes",
        document: newRecipe,
      });

      handleFetchRecipes();

      alert(`succesffully created a recipe with an ID = ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateRecipe = async (newRecipe, recipeId) => {
    try {
      await FirebaseFirestoreService.updateDocument({
        collection: "recipes",
        id: recipeId,
        document: newRecipe,
      });

      handleFetchRecipes();
      alert(`Succesfully update a recipe with an ID = ${recipeId}`);
      setCurrentRecipe(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  function handleEditRecipeClick(recipeId) {
    const selectedRecipe = recipes.find((recipe) => {
      return recipe.id === recipeId;
    });
    if (selectedRecipe) {
      setCurrentRecipe(selectedRecipe);
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  const handleDeleteRecipe = async (recipeId) => {
    console.log("110", recipeId);
    const deleteConfirmation = window.confirm(
      "Are you sure you want to delete?"
    );

    if (deleteConfirmation) {
      try {
        await FirebaseFirestoreService.deleteDocument({
          collection: recipeId.collection,
          id: recipeId.id,
        });
        handleFetchRecipes();
        setCurrentRecipe(null);
        window.scrollTo(0, 0);
        alert(`Successfuly Deleted a recipe ${recipeId}`);
      } catch (error) {
        alert(error.message);
        throw error;
      }
    }
  };
  const handleEditRecipeCancel = () => {
    setCurrentRecipe(null);
  };

  const lookupCategoryLabel = (categoryKey) => {
    const categories = {
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      dessert: "Dessert",
      sides: "Sides",
      drinks: "Drinks",
    };
    const label = categories[categoryKey];
    return label;
  };

  const formatDate = (date) => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getFullYear();
    const dateString = `${month}-${day}-${year}`;
    return dateString;
  };

  return (
    <div className="App">
      <div className="title-row" style={{ maxWidth: "80%" }}>
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
      <div className="main">
        <div className="row apart filters">
          <label className="recipe-label input-label">
            Category:
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
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
        </div>
        <div className="center">
          <div className="recipe-list-box">
            {recipes && recipes.length > 0 ? (
              <div className="recipe-list">
                {recipes.map((recipe) => {
                  return (
                    <div className="recipe-card" key={recipe.id}>
                      {recipe.isPublished === false ? (
                        <div className="unpublished">UNPUBLISHED</div>
                      ) : null}
                      <div className="recipe-name">{recipe.name}</div>
                      <div className="recipe-field">
                        Category: {lookupCategoryLabel(recipe.category)}
                      </div>
                      <div className="recipe-field">
                        PublishDate: {formatDate(recipe.publishDate)}
                      </div>
                      {user ? (
                        <button
                          type="button"
                          onClick={() => handleEditRecipeClick(recipe.id)}
                          className="primary-button edit-button"
                        >
                          EDIT
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        {user ? (
          <AddEditRecipeForm
            existingRecipe={currentRecipe}
            handleAddRecipe={handleAddRecipe}
            handleUpdateRecipe={handleUpdateRecipe}
            handleEditRecipeCancel={handleEditRecipeCancel}
            handleDeleteRecipe={handleDeleteRecipe}
          ></AddEditRecipeForm>
        ) : null}
      </div>
    </div>
  );
}

export default App;
