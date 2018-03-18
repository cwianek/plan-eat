import React, { Component } from 'react'
import { Text, Button, View, Animated, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../../store/session/actions';
import { searchRecipes } from '../../../store/recipes/actions'
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

    toggleModal = (recipe) => {
        let newRecipe = null;
        if (recipe) {
            newRecipe = recipe;
        }
        this.setState({ isModalVisible: !this.state.isModalVisible, recipe });
    }

    listItemPress(friend) {
        this.props.navigation.navigate('Messages', { friend })
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}>
                    <AnimatedListWrapper
                        searchRecipes={this.props.searchRecipes}
                        logoutUser={this.props.logoutUser}
                        content={
                            <RecipeList
                                recipePress={this.toggleModal}
                                recipesList={this.props.recipesList} />} />
                    {
                        this.state.recipe ?
                            <RecipeDetails
                                recipe={this.state.recipe}
                                isModalVisible={this.state.isModalVisible}
                                toggleModal={this.toggleModal} />
                            : null
                    }
                </ImageBackground>
            </View>

        )
    }
}

const styles = {
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
}

const mapStateToProps = state => ({
    recipesList: state.recipes.recipesList
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutUser, searchRecipes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesScreen);

