import React from 'react';
import { StackNavigator } from 'react-navigation'
import ProfileScreen from './profile'
import RecipesHistory from './recipes-history'
import UserLimits from './user-limits'

const routeConfig = StackNavigator({
    Profile: {
        screen: ProfileScreen,
    },
    History: {
        screen: RecipesHistory
    },
    UserLimits: {
        screen: UserLimits
    }
})

export default routeConfig