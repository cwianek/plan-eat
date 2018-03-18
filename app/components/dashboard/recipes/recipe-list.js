import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { RECIPE_ALT, RECIPE_ALT2 } from '../../dimensions';
import { Button, Input } from 'react-native-elements';
export default class RecipeList extends React.Component {

    listItemPress(friend) {
        this.props.navigation.navigate('Messages', { friend })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.recipesList.map((l, i) => (
                        <Card containerStyle={styles.containerCard} >
                            <TouchableOpacity onPress={() => this.props.recipePress(l)}>
                                <ImageBackground source={l.recipe_image ? { uri: l.recipe_image } : RECIPE_ALT} style={styles.bgImage}>
                                    <View style={styles.wrapper}>
                                        <Text style={styles.recipeTitle}>{l.recipe_name}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </Card>
                    ))
                }
            </View>
        )
    }
}

styles = {
    container: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flex: 1,
    },
    containerCard: {
        width: 150,
        height: 150,
        padding: 0,
        borderColor: 'black',
    }, bgImage: {
        width: 150,
        height: 150,
    },
    wrapper: {
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'rgba(25,25,25,0.6)',
        flex: 1
    }, recipeTitle: {
        padding: 10,
        color: 'white',
        fontSize: 16,
        fontFamily: 'light'
    }, recipeDesc: {
        padding: 10,
        color: 'rgb(150,150,150)',
        fontSize: 14,
        fontFamily: 'light'
    }
}