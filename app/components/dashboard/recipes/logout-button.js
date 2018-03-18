import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import ROOT_URL from '../../../config/endpoint';

class HeaderForm extends React.Component {

    render() {
        return (
            <View style={{ position: 'absolute', left: '50%' }}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => this.props.logoutUser()}
                    activeOpacity={0.2}>
                    <Text
                        style={styles.buttonText}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    logoutButton: {
        position: 'relative',
        top: -70,
        left: 90,
        right: 0,
        width: 100,
        height: 40,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 105,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white'
    }
}

export default HeaderForm;