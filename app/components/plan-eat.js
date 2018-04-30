import React, { Component } from 'react'
import { Text, Button, View, Animated, TouchableOpacity } from 'react-native';
import AuthScreen from './auth-screen';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather'
import { bindActionCreators } from 'redux';
import { loadUserProducts } from '../store/products/actions';
import { signupUser, loginUser, restoreSession, logoutUser } from '../store/session/actions';
import { Header } from 'react-native-elements'
import LogoutButton from './dashboard/logout-button'

import Tabs from './dashboard/tabs';
import { SECOND_COLOR } from './colors';

class PlanEat extends Component {
    constructor(props) {
        super(props);
        this.state = { scrollY: new Animated.Value(0) };
    }

    componentDidMount() {
        this.props.restoreSession();
    }

    render() {
        if (this.props.user && this.props.user.token) {
            return (
                <View style={{ flex: 1, width: '100%' }}>
                    <Header
                        leftComponent={{ icon: 'menu', color: 'white' }}
                        centerComponent={{ text: 'PlanEat', style: { color: 'white', fontSize: 20, fontFamily: 'light' } }}
                        rightComponent={<LogoutButton logoutUser={this.props.logoutUser} />}
                        outerContainerStyles={{ height: 65, paddingTop: 15, backgroundColor: SECOND_COLOR, borderBottomWidth: 0 }}
                    />
                    <Tabs loadUserProducts={this.props.loadUserProducts} />
                </View>
            )
        } else {
            return <AuthScreen loading={this.props.loading} signupUser={this.props.signupUser} loginUser={this.props.loginUser} />
        }
    }
}

const mapStateToProps = state => ({
    loading: state.session.loading,
    user: state.session.user,
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signupUser, loginUser, logoutUser, restoreSession, loadUserProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanEat);

