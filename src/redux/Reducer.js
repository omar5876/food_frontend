import { CLEAN, FILTER, GET_DIETS, GET_RECIPES, GET_RECIPES_BY_ID, GET_RECIPES_BY_NAME, ORDER, ORDER_BY_HEALTH_SCORE } from "./Actions"

const initialState = {
    getRecipes : [],
    allRecipes : [],
    getRecipeDetails: {},
    getRecipeByID: {},
    getDiets: []
}




const reducer = (state=initialState, action) => {
    switch(action.type){
        case GET_RECIPES:
            return {
                ...state,
                getRecipes: action.payload,
                allRecipes: action.payload
            }
        case GET_RECIPES_BY_ID:
            return {
                ...state,
                getRecipeByID: action.payload
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                getRecipes: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                getDiets: action.payload
            }
        case ORDER:
            let totalRecipes = state.getRecipes;
            if(action.payload === "asc") totalRecipes.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                else return 0
            })
            else totalRecipes.sort((a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                else return 0
            })
            return {
                ...state,
                getRecipes: totalRecipes
            }
        case ORDER_BY_HEALTH_SCORE:
                let totalRecipes2 = state.getRecipes
                if(action.payload === "asc") totalRecipes2.sort((a, b) => {
                    if(a.healthScore > b.healthScore) return 1
                    if(a.healthScore < b.healthScore) return -1
                    else return 0
                })
                else totalRecipes2.sort((a, b) => {
                    if(a.healthScore > b.healthScore) return -1
                    if(a.healthScore < b.healthScore) return 1
                    else return 0
                })
            return {
                ...state,
                getRecipes: totalRecipes2
            }
        case FILTER:
                let filterRecipes = state.allRecipes.filter(e => e.diets.find(i => i.includes(action.payload) ))
            return {
                ...state,
                getRecipes: filterRecipes
            }
        case CLEAN:
            return {
                ...state,
                getRecipes: [],
                getRecipeByID: {}
            }
        default:
            return state
    }
}



export default reducer