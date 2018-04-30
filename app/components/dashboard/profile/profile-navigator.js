import React from 'react';
import { StackNavigator } from 'react-navigation'
import ProfileScreen from './profile'
import RecipesHistory from './recipes-history'

const routeConfig = StackNavigator({
    Profile: {
        screen: ProfileScreen,
    },
    History:{
        screen: RecipesHistory
    }
})

export default routeConfig