import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

class HeaderForm extends React.Component {

    render() {
        return (
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => this.props.logoutUser()}
                    activeOpacity={0.2}>
                   <Icon name='log-out' color='white' size={18} />
                </TouchableOpacity>
        )
    }
}

const styles = {
}

export default HeaderForm;