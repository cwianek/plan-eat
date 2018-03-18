import React from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import { debounce } from '../../utils';


class RecipesSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { version: props.mini ? true : false }
    }

    onValueChange = (text) => {
        this.props.changeSearchText(text);
        this.search(text);
    }

    search = debounce((text) => {
        if (text) {
            this.props.searchRecipes(text);
        }
    }, 500)

    render() {
        const { version } = this.state;
        return (
            <Input
                width={230}
                icon={<Icon
                    name='search'
                    color='rgba(171, 189, 219, 1)'
                    size={25} />}
                onChangeText={
                    text => {
                        this.onValueChange(text);
                    }
                }
                value={this.props.text}
                inputStyle={[{ marginLeft: 10, color: 'white' }]}
                containerStyle={version ? { borderBottomWidth: 0 } : {}}
                keyboardAppearance="light"
                placeholder="Recipe"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                ref={input => this.emailInput = input}
                blurOnSubmit={false}
                placeholderTextColor="white"
                errorStyle={{ textAlign: 'center', fontSize: 12 }}
            />
        )
    }
}

const styles = {
    wrapper: {
        left: '-50%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    button: {
        marginTop: 20,
        width: 120,
        height: 40,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 2,
        borderRadius: 30,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 105,
    }
}

export default RecipesSearch;