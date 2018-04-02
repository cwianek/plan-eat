import React from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { RECIPE_ALT, RECIPE_ALT2, SCREEN_WIDTH } from '../../dimensions';
import { Button, Input } from 'react-native-elements';
import { TEXT_COLOR, SECOND_COLOR } from '../../colors';
import StarRating from 'react-native-star-rating';

export default class RecipeList extends React.Component {

    render() {
        return (
            this.props.recipeListLoading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={SECOND_COLOR} />
                </View>
                :
                <ScrollView contentContainerStyle={styles.container}>
                    {
                        this.props.recipesList.map((l, i) => (
                            <Card
                                key={l.recipe_id}
                                containerStyle={styles.containerCard}>
                                <TouchableOpacity onPress={() => this.props.recipePress(l)}>
                                    <Image source={l.recipe_image ? { uri: l.recipe_image } : RECIPE_ALT} style={styles.bgImage} />
                                    <Text style={styles.recipeTitle}>{l.recipe_name}</Text>
                                    <Text style={styles.recipeDescription}>{l.recipe_description}</Text>
                                    <StarRating
                                        containerStyle={styles.stars}
                                        disabled={false}
                                        emptyStar={'ios-star-outline'}
                                        fullStar={'ios-star'}
                                        halfStar={'ios-star-half'}
                                        iconSet={'Ionicons'}
                                        maxStars={5}
                                        rating={4}
                                        starSize={10}
                                        fullStarColor={SECOND_COLOR}
                                    />
                                </TouchableOpacity>
                            </Card>
                        ))
                    }
                </ScrollView>
        )
    }
}

styles = {
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
    },
    containerCard: {
        alignItems: 'center',
        elevation: 0,
        padding: 0,
        margin: 0,
        borderWidth: 0,
        borderRadius: 5,
        width: SCREEN_WIDTH / 2 - 30,
        minHeight: 200,
        marginBottom: 10,

    }, bgImage: {
        borderRadius: 8,
        width: SCREEN_WIDTH / 2 - 25,
        height: 90,
    },
    wrapper: {
        alignItems: 'center',
        flex: 1
    }, recipeTitle: {
        paddingTop: 5,
        marginLeft: 2,
        color: TEXT_COLOR,
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'light'
    }, recipeDescription: {
        marginLeft: 2,
        color: TEXT_COLOR,
        fontSize: 13,
        fontFamily: 'light'
    }, stars: {
        marginLeft: 2,
        width: 50
    }
}