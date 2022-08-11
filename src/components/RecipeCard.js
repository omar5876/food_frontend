import s from "../css/RecipeCard.module.css";
import { Link } from "react-router-dom";

const RecipeCard = ({ name, image, diets, id }) => {
  return (
    <Link className={s.recipeCardContainer} to={`/Details/${id}`}>
      <div className={s.recipeCardImgContainer}>
        <img src={image} alt={name}/>
      </div>
      <div className={s.recipeCardName}>
        <h4>Name</h4>
        <p>{name}</p>
      </div>
      <div className={s.recipeCardDiets}>
        <h4>Diets</h4>
        <p>{diets.join(", ").split("")}</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
