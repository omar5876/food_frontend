import s from "../css/Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clean, getRecipes } from "../redux/Actions";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import Searchbar from "../components/Searchbar";
import Loading from "../components/Loading";


const Home = () => {
  let dispatch = useDispatch();
  let recipes = useSelector((state) => state.getRecipes);
  
  let [actualPage, setActualPage] = useState(1);
  let [recipesPerPage, setRecipesPerPage] = useState(9);
  let lastIndex = actualPage * recipesPerPage;
  let firstIndex = lastIndex - recipesPerPage;
  let recipesPage = recipes.slice(firstIndex, lastIndex);

  let [sortRecipes, setSortRecipes] = useState()

  useEffect(() => {
    dispatch(getRecipes());
    return dispatch(clean())
  }, [dispatch]);
  return (
    <>
      {!recipes.length?
      <>
      <Searchbar setActualPage={setActualPage} setSortRecipes={setSortRecipes}/>
      <Loading/>
      </>
      :
      <>
      <Searchbar setActualPage={setActualPage} setSortRecipes={setSortRecipes}/>
      {recipes[0].name &&<Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        actualPage={actualPage}
        setActualPage={setActualPage}
      />}
      <div className={s.homeContainer}>
        {!recipes[0].name
        ?
        <div className={s.recipeNotFoundContainer}><button onClick={() => dispatch(getRecipes())}>Reload</button>Recipe not Found</div>
        :
        recipesPage.map((e) => (
          <RecipeCard key={e.id} name={e.name} image={e.image} diets={e.diets} id={e.id}/>
        ))
          }
      </div>
      {recipes[0].name &&<Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        actualPage={actualPage}
        setActualPage={setActualPage}
      />}
      </>
      
    }
    </>
  );
};

export default Home;
