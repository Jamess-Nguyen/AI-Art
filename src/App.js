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

  useEffect(() => {
    fetchRecipes()
      .then((fetchedRecipes) => {
        setRecipes(fetchedRecipes);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  }, [user]);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  const fetchRecipes = async () => {
    let fetchedRecipes = [];
    try {
      const response = await FirebaseFirestoreService.readDocuments("recipes");
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
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );

      handleFetchRecipes();

      alert(`succesffully created a recipe with an ID = ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
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
        <div className="center">
          <div className="recipe-list-box">
            {recipes && recipes.length > 0 ? (
              <div className="recipe-list">
                {recipes.map((recipe) => {
                  console.log("Recid", recipe.category);
                  return (
                    <div className="recipe-card" key={recipe.id}>
                      <div className="recipe-name">{recipe.name}</div>
                      <div className="recipe-field">
                        Category: {lookupCategoryLabel(recipe.category)}
                      </div>
                      <div className="recipe-field">
                        PublishDate: {formatDate(recipe.publishDate)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        {user ? (
          <AddEditRecipeForm
            handleAddRecipe={handleAddRecipe}
          ></AddEditRecipeForm>
        ) : null}
      </div>
    </div>
  );
}

export default App;
