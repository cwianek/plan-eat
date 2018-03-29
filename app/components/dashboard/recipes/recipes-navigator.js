import { StackNavigator } from 'react-navigation'
import RecipesScreen from './main-screen'
import RecipeDetails from './recipe-details'

const routeConfig = {
    Recipes: {
        screen: RecipesScreen,
    },
    Details:{
        screen: RecipeDetails
    }
}

export default StackNavigator(routeConfig)