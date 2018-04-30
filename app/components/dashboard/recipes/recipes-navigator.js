import React from 'react';
import { StackNavigator } from 'react-navigation'
import RecipesScreen from './recipes'
import RecipeDetails from './recipe-details'

const routeConfig = StackNavigator({
    Recipes: {
        screen: RecipesScreen,
    },
    Details:{
        screen: RecipeDetails
    }
})

export default routeConfig