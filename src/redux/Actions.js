import axios from 'axios'

export const GET_RECIPES = 'getRecipes';
export const GET_RECIPES_BY_ID = "getRecipesById";
export const GET_RECIPES_BY_NAME = "getRecipesByName"
export const GET_DIETS = 'getDiets'
export const ORDER = 'order'
export const FILTER = 'filter'
export const CLEAN = 'clean'
export const ORDER_BY_HEALTH_SCORE = 'orderByHealthScore'


export const getRecipes = () => {
    return async (dispatch) => {
        let recipes = (await axios.get('https://food-api-omar.herokuapp.com/recipes')).data
        return dispatch({
            type: GET_RECIPES,
            payload: recipes
        })
    }
}

export const getRecipesById = (id) => {
    return async (dispatch) => {
            let recipeById = (await axios.get(`https://food-api-omar.herokuapp.com/recipes/${id}`)).data
            return dispatch({
                type: GET_RECIPES_BY_ID,
                payload: recipeById
            })
    }
}

export const getRecipeByName = (name) => {
    return async (dispatch) => {
        try {
            
            let recipeByName = (await axios.get(`https://food-api-omar.herokuapp.com/recipes/name?name=${name}`)).data
            return dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: recipeByName
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDiets = () => {
    return async (dispatch) => {
        let diets = (await axios.get('https://food-api-omar.herokuapp.com/diets')).data
        return dispatch({
            type: GET_DIETS,
            payload: diets
        })
    }
}

export const order = (order) => {
    return {
        type: ORDER,
        payload: order
    }
}

export const orderByHealthScore = (order) => {
    return {
        type: ORDER_BY_HEALTH_SCORE,
        payload: order
    }
}

export const filter = (filter) => {
    return {
        type: FILTER,
        payload: filter
    }
}

export const clean = () => {
    return {
        type: CLEAN
    }
}