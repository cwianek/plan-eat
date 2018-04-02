import React from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import TabNavigator from 'react-native-tab-navigator';
import RecipesNavigator from './recipes/recipes-navigator';
import { SECOND_COLOR, TEXT_COLOR } from '../colors';
import  ProductsList  from './products/products-list';

class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'recipes' }
    }

    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selected == 'recipes'}
                    title="Recipes"
                    titleStyle={{ color: TEXT_COLOR }}
                    selectedTitleStyle={{ color: SECOND_COLOR }}
                    renderIcon={() => <MaterialCommunityIcons
                        name='food'
                        size={25} />}
                    renderSelectedIcon={() => <MaterialCommunityIcons
                        name='food'
                        size={25} />}
                    onPress={() => this.setState({ selected: 'recipes' })}>
                    <RecipesNavigator />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selected == 'products'}
                    title="Your products"
                    titleStyle={{ color: TEXT_COLOR }}
                    selectedTitleStyle={{ color: SECOND_COLOR }}
                    renderIcon={() => <EntypoIcons
                        name='list'
                        size={25} />}
                    renderSelectedIcon={() => <EntypoIcons
                        name='list'
                        size={25} />}
                    onPress={() => this.setState({ selected: 'products' })}>
                    <ProductsList />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selected == 'user'}
                    title="User profile"
                    titleStyle={{ color: TEXT_COLOR }}
                    selectedTitleStyle={{ color: SECOND_COLOR }}
                    renderIcon={() => <EntypoIcons
                        name='user'
                        size={25} />}
                    renderSelectedIcon={() => <EntypoIcons
                        name='user'
                        size={25} />}
                    onPress={() => this.setState({ selected: 'user' })}>
                    <Text>User Profiles</Text>
                </TabNavigator.Item>
            </TabNavigator >
        )
    }
}

const styles = {

}

export default Tabs;
