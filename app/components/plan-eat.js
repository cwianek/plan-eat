import React, { Component } from 'react'
import { Text, Button, View, Animated, TouchableOpacity } from 'react-native';
import AuthScreen from './auth-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signupUser, loginUser, restoreSession } from '../store/session/actions';

import Dashboard from './dashboard'

class PlanEat extends Component {
    constructor(props) {
        super(props);
        this.state = { scrollY: new Animated.Value(0) };
    }

    componentDidMount() {
        this.props.restoreSession()
    }

    render() {
        if (this.props.user && this.props.user.token) {
            return (
                <View style={{ flex: 1, width: '100%' }}>
                    <Dashboard />
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
    return bindActionCreators({ signupUser, loginUser, restoreSession }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanEat);

