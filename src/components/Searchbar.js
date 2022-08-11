import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "../css/Searchbar.module.css";
import searchbarIcon from "../img/searchbarIcon.jpg";
import { filter, getDiets, getRecipeByName, order, orderByHealthScore } from "../redux/Actions";
const Searchbar = ({setActualPage, setSortRecipes}) => {
    let [name, setName] = useState()
    
    let diets = useSelector(state => state.getDiets)
    let dispatch = useDispatch()

    const handleChange = (e) => {
      setName(e.target.value)
    }

    const searchRecipe = () => {
      if(name)dispatch(getRecipeByName(name))
      else alert('Search field is empty')
      setActualPage(1)
      setName('')
    }

    const handleChangeFilter = (e) => {
      dispatch(filter(e.target.value))
      setActualPage(1)

    }

    const handleChangeOrder = (e) => { 
      dispatch(order(e.target.value))
      setSortRecipes(e.target.value)
        setActualPage(1)
    }

    const handleChangeOrderByHealthScore = (e) => {
      dispatch(orderByHealthScore(e.target.value))
      setSortRecipes(e.target.value)
      setActualPage(1)
    }

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])
  return (
    <div className={s.searchbarContainer}>
      <div>
        <input type={"text"} name="name" value={name} placeholder='Search a recipe...' onChange={handleChange} required/>
        <button>
          <img src={searchbarIcon} alt='searchIcon' onClick={searchRecipe}/>
        </button>
      </div>
        <select onChange={handleChangeFilter}>
          <option disabled selected>Choose a Type of Diet</option>
          {diets.length&&diets.map((d, i) => <option key={i} value={d.name}>{d.name}</option>)}
        </select>

        <select onChange={handleChangeOrder}>
          <option disabled selected>Order by Name</option>
          <option value={'asc'}>Ascendent</option>
          <option value={'desc'}>Descendent</option>
        </select>

        <select onChange={handleChangeOrderByHealthScore}>
          <option disabled selected>Order by Health Score</option>
          <option value={'asc'}>Ascendent</option>
          <option value={'desc'}>Descendent</option>
        </select>
    </div>
  );
};

export default Searchbar;
