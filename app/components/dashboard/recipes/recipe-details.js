import React from 'react';
import { Text, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { RECIPE_ALT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../dimensions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRecipeDetails, addUserRecipe } from '../../../store/recipes/actions'
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TEXT_COLOR, SECOND_COLOR } from '../../colors'
import TabNavigator from 'react-native-tab-navigator';
import StarRating from 'react-native-star-rating';
import Toast, { DURATION } from 'react-native-easy-toast';



class RecipeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = { fullServings: false }
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
        tabBarVisible: false,
        tabBarHidden: true

    })

    componentDidMount() {
        this.props.getRecipeDetails(this.props.navigation.state.params.recipe.recipe_id)
    }

    render() {
        const { recipe } = this.props;
        if (recipe) {
            const servingsToDisplay = this.state.fullServings ? Object.keys(recipe.serving_sizes.serving) : ['calories', 'protein', 'fat', 'carbohydrate']
            const recipeImage = recipe.recipe_images ? recipe.recipe_images.recipe_image : null
            const image = recipeImage ? { uri: Array.isArray(recipeImage) ? recipeImage[0] : recipeImage } : RECIPE_ALT
            return (
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    <Image source={image} style={styles.image} />
                    <View style={styles.wrapper}>

                        <View style={styles.recipeTypesContainer}>
                            {
                                Array.isArray(recipe.recipe_types.recipe_type) ?
                                    recipe.recipe_types.recipe_type.map((type, index) => (
                                        <Text key={index} style={styles.recipeType}>{type}</Text>
                                    ))
                                    : <Text style={styles.recipeType}>{recipe.recipe_types.recipe_type}</Text>
                            }

                        </View>

                        <Text style={styles.title}>{recipe.recipe_name}</Text>
                        <View style={styles.starsWrapper}>
                            <View style={styles.starsContainer}>
                                <StarRating
                                    containerStyle={styles.stars}
                                    disabled={false}
                                    emptyStar={'ios-star-outline'}
                                    fullStar={'ios-star'}
                                    halfStar={'ios-star-half'}
                                    iconSet={'Ionicons'}
                                    maxStars={5}
                                    rating={Number(recipe.rating)}
                                    starSize={10}
                                    fullStarColor={SECOND_COLOR}
                                />
                            </View>
                            <View style={styles.headerContainer}>
                                <View style={styles.timeContainer}>
                                    <Ionicons
                                        name='ios-time-outline'
                                        size={20} />
                                    <Text style={styles.timeText}>{recipe.preparation_time_min ? recipe.preparation_time_min : recipe.cooking_time_min ? recipe.cooking_time_min : 30}min</Text>
                                </View>
                                <Button
                                    clear
                                    containerStyle={styles.addButtonContainer}
                                    titleStyle={styles.addButtonTitle}
                                    title={"add"}
                                    onPress={() => {
                                        this.props.addUserRecipe(this.props.recipe);
                                        this.refs.toast.show('Recipe added to Your list');
                                    }}>
                                </Button>
                            </View>
                        </View>


                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, marginHorizontal: 15 }} />
                        <Text style={styles.sectionHeader}>Ingredients</Text>
                        <View style={styles.ingredientsContainer}>
                            {
                                recipe.ingredients.ingredient.map((ingredient, index) => (
                                    this.props.userProducts.filter(product => (product.food_id === ingredient.food_id || product.food_name === ingredient.food_name)).length > 0 ?
                                        <Text key={index} style={[styles.ingredient, styles.ownedIngredient]}>{`${ingredient.food_name}`}</Text>
                                        :
                                        <Text key={index} style={styles.ingredient}>{`${ingredient.food_name}`}</Text>
                                ))
                            }
                        </View>

                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, marginHorizontal: 15 }} />
                        <Text style={styles.sectionHeader}>Values per serving</Text>
                        <View style={styles.servingContainer}>
                            {
                                servingsToDisplay.map((value, index) => (
                                    <Text key={index} style={styles.serving}>{value}: {recipe.serving_sizes.serving[value]}</Text>
                                ))
                            }
                        </View>
                        <Button
                            clear
                            containerStyle={styles.showMoreContainer}
                            titleStyle={styles.showMore}
                            title={this.state.fullServings ? "hide" : "show more"}
                            onPress={() => { this.setState({ fullServings: !this.state.fullServings }) }}>
                        </Button>

                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, marginHorizontal: 15 }} />
                        <Text style={styles.sectionHeader}>Description</Text>
                        {
                            recipe.directions.direction.map((direction, index) => (
                                <View key={index}>
                                    <Text style={styles.description}>{`\u2022 ${direction.direction_description}`}</Text>
                                </View>
                            ))
                        }
                    </View>
                    <Toast
                        ref="toast"
                        style={{ backgroundColor: SECOND_COLOR }}
                        positionValue={SCREEN_HEIGHT-200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: 'white' }}
                    />
                </ScrollView>
            )
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={SECOND_COLOR} />
                </View>)
        }
    }
}

const styles = {
    wrapper: {
        backgroundColor: 'white'
    },
    closeButton: {
        position: 'absolute',
        width: 100,
        height: 30,
        bottom: 0,
        marginVertical: 20,
        right: 0,
    },
    image: {
        position: 'relative',
        zIndex: 1,
        width: SCREEN_WIDTH,
        height: 250,
        flex: 1,
        backgroundColor: 'transparent'
    },
    title: {
        color: TEXT_COLOR,
        fontFamily: 'light',
        fontSize: 30,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        color: TEXT_COLOR,
        fontFamily: 'light',
        fontSize: 20,
        padding: 20
    },
    description: {
        color: TEXT_COLOR,
        fontFamily: 'light',
        fontSize: 14,
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    recipeTypesContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 10
    },
    recipeType: {
        color: TEXT_COLOR,
        fontFamily: 'light',
        fontSize: 14,
        padding: 5,
        paddingBottom: 0,
    }, ingredientsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 15,
        marginBottom: 25,
    }, ingredient: {
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
        color: TEXT_COLOR,
        fontFamily: 'light',
        fontSize: 14,
        margin: 2,
        padding: 4
    },
    ownedIngredient: {
        backgroundColor: 'green',
        color: 'white'
    },
    serving: {
        color: TEXT_COLOR,
        fontFamily: 'light',
        fontSize: 14,
        padding: 5,
    },
    servingContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingLeft: 15,
        marginBottom: 15,
    },
    starsWrapper: {
    },
    showMore: {
        padding: 0,
        margin: 0,
    },
    starsContainer: {
        paddingLeft: 20,
        width: 120,
        paddingBottom: 15,
    },
    stars: {
        marginLeft: 2,
        paddingTop: 10,
    },
    headerContainer: {
        paddingLeft: 20,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    timeContainer: {
        flexDirection: 'row',
    }, timeText: {
        fontFamily: 'light',
        marginLeft: 10
    }, showMoreContainer: {
        justifyContent: 'center',
        height: 20,
        margin: 10,
        flex: 0,
        backgroundColor: 'transparent'
    }, showMore: {
        color: TEXT_COLOR,
        fontFamily: 'light',
        fontWeight: 'normal'
    }, addButtonContainer: {
        top: -10,
        position: 'relative',
        marginRight: 30,
        borderWidth: 2,
        height: 40,
        borderRadius: 5,
        borderColor: SECOND_COLOR,
        width: 100,
        //backgroundColor: SECOND_COLOR
    }, addButtonTitle: {
        width: 100,
        color: SECOND_COLOR,
        //color: 'white',
        fontFamily: 'light',
        fontWeight: 'normal'
    }
}

const mapStateToProps = state => ({
    recipe: state.recipes.currentRecipe,
    userProducts: state.products.userProducts
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getRecipeDetails, addUserRecipe }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);