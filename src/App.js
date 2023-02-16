import "./App.css";
import "./App.scss";
import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

function App() {
  const [user, setUser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipies",
        newRecipe
      );
      alert(`succesffully created a recipe with an ID = ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <div className="title-row" style={{ maxWidth: "80%" }}>
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
      <div className="main">
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
