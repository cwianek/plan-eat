import React, { Component } from 'react'
import { Text, Button, View, Animated, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../../store/session/actions';
import { searchRecipes, getRecipeDetails } from '../../../store/recipes/actions'
import RecipeList from './recipe-list'
import RecipeDetails from './recipe-details'
import { BG_IMAGE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../dimensions';
import RecipesSearch from './recipes-search'

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
                <RecipesSearch
                    searchRecipes={this.props.searchRecipes} />
                    < RecipeList
                        recipePress={this.recipePress}
                        recipesList={this.props.recipesList}
                        recipeListLoading={this.props.recipeListLoading}
                    />
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
    recipeListLoading: state.recipes.listLoading
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser, searchRecipes, getRecipeDetails }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesScreen);

