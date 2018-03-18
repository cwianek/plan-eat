import { StackNavigator } from 'react-navigation'
import RecipesScreen from './recipes'

const routeConfig = {
    Recipes: {
        screen: RecipesScreen,
    },
}

export default StackNavigator(routeConfig)