import React from 'react';
import { Text, View, Animated } from 'react-native';
import { Button, Input } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import TabNavigator from 'react-native-tab-navigator';
import RecipesNavigator from './recipes/recipes-navigator';
import { SECOND_COLOR, TEXT_COLOR } from '../colors';
import ProductsList from './products/products-list';
import ProfileNavigator from './profile/profile-navigator';

class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'recipes' }
    }

    componentDidMount() {
        this.props.loadUserProducts();
    }

    tabChange = () => {
        this.setState({ selected: 'recipes' });
    }

    render() {
        return (
            <TabNavigator
                tabBarStyle={{ backgroundColor: 'white', borderTopWidth: 0.15, borderColor: SECOND_COLOR }}
                tabBarShadowStyle={{ display: 'none' }}>
                <TabNavigator.Item
                    selected={this.state.selected == 'recipes'}
                    title="Recipes"
                    titleStyle={{ color: TEXT_COLOR }}
                    selectedTitleStyle={{ color: SECOND_COLOR }}
                    renderIcon={() => <MaterialCommunityIcons
                        name='food'
                        color={TEXT_COLOR}
                        size={23} />}
                    renderSelectedIcon={() => <MaterialCommunityIcons
                        name='food'
                        color={SECOND_COLOR}
                        size={23} />}
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
                        color={TEXT_COLOR}
                        size={23} />
                    }
                    renderSelectedIcon={() => <EntypoIcons
                        name='list'
                        color={SECOND_COLOR}
                        size={23} />}
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
                        color={TEXT_COLOR}
                        size={19} />}
                    renderSelectedIcon={() => <EntypoIcons
                        name='user'
                        color={SECOND_COLOR}
                        size={19} />}
                    onPress={() => this.setState({ selected: 'user' })}>
                    <ProfileNavigator screenProps={{ tabChange: this.tabChange }} />
                </TabNavigator.Item>
            </TabNavigator >
        )
    }
}

const styles = {

}

export default Tabs;
