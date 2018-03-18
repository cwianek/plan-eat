import React from 'react';
import { Text, Image, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { RECIPE_ALT } from '../../dimensions';
import Modal from "react-native-modal";


class RecipeDetails extends React.Component {
    render() {
        const { recipe } = this.props
        return (
            <Modal
                useNativeDriver={true}
                isVisible={this.props.isModalVisible}>
                <View
                    style={{ flex: 1, alignItems: 'center' }}>
                    <Image source={recipe.recipe_image ? { uri: recipe.recipe_image } : RECIPE_ALT} style={styles.image} />
                    <View style={styles.wrapper}>

                        <Text style={styles.title}>{recipe.recipe_name}</Text>
                    </View>

                    <Button
                        containerStyle={styles.closeButton}
                        clear
                        textStyle={{ color: 'white', fontSize: 15 }}
                        activeOpacity={0.5}
                        onPress={this.props.toggleModal}
                        text="Close">                    >
                    </Button>
                </View>
            </Modal>
        )
    }
}

const styles = {
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
        top: 10,
        zIndex: 1,
        width: 100,
        height: 100,
        backgroundColor: 'transparent'
    },
    title: {
        color: 'white',
        fontFamily: 'light',
        fontSize: 20,
        padding: 20
    },
    wrapper: {
        backgroundColor: 'black'
    }
}

export default RecipeDetails;