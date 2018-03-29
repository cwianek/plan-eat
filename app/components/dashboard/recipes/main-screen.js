import React, { Component } from 'react'
import { Text, Button, View, Animated, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../../store/session/actions';
import { searchRecipes, getRecipeDetails } from '../../../store/recipes/actions'
import RecipeList from './recipe-list'
import AnimatedListWrapper from './animated-list-wrapper'
import RecipeDetails from './recipe-details'
import { BG_IMAGE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../dimensions';


class RecipesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { scrollY: new Animated.Value(0), isModalVisible: false, recipe: null };
    }

    static navigationOptions = {
        header: null,
    }

    recipePress = (recipe) => {
        this.props.navigation.navigate('Details', { recipe })
    }

    render() {
        return (
            <View style={styles.container}>
                <AnimatedListWrapper
                    searchRecipes={this.props.searchRecipes}
                    logoutUser={this.props.logoutUser}
                    content={
                        <RecipeList
                            recipePress={this.recipePress}
                            recipesList={this.props.recipesList}
                        />} />
            </View>

        )
    }
}

const styles = {
    container: {
        flex: 1
    },
}

const mapStateToProps = state => ({
    recipesList: state.recipes.recipesList,
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser, searchRecipes, getRecipeDetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesScreen);

