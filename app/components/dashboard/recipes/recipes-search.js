import React from 'react';
import { Text, View } from 'react-native';
import { Button, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
//import { debounce } from '../../utils';
import { TEXT_COLOR, SECOND_COLOR } from '../../colors';

class RecipesSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { version: props.mini ? true : false, text: '' }
    }

    // debounce(fn, delay) {
    //     var timer = null;
    //     return function () {
    //         var context = this, args = arguments;
    //         clearTimeout(timer);
    //         timer = setTimeout(function () {
    //             fn.apply(context, args);
    //         }, delay);
    //     };
    // }

    onChangeText = (text) => {
        this.setState({text })
    }

    search = (text) => {
        console.log(text);
        if (text) {
            this.props.searchRecipes(text);
        }
    }

    render() {
        const { version } = this.state;
        return (
            <View>
                <SearchBar
                    value={this.props.text}
                    onChangeText={text => this.onChangeText(text)}
                    keyboardAppearance="light"
                    lightTheme
                    returnKeyType="search"
                    platform="android"
                    onSubmitEditing={() => this.search(this.state.text)}
                    placeholder='Search recipe' />
            </View>
        )
    }
}

const styles = {
}

export default RecipesSearch;