import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { Font } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome'

import { SECOND_COLOR, TEXT_COLOR } from './colors'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../assets/images/bg12.jpg');

class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: '',
      email_valid: true,
      password: '',
      login_failed: false,
      showLoading: false,
      signIn: false,
      accounButtonText: 'Create an Account',
      buttonText: 'LOG IN',
      loginAdditionalText: 'New here?'
    };
  }

  componentDidMount() {
    Font.loadAsync({
      'georgia': require('../assets/fonts/Georgia.ttf'),
      'regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'light': require('../assets/fonts/Montserrat-Light.ttf'),
      'bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    }).then(this.setState({ fontLoaded: true }))
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  submitLoginCredentials() {
    const { password, email, signIn } = this.state;
    if (signIn) {
      console.log('singIn')
      this.props.signupUser(email, password);
    } else {
      console.log('login')
      this.props.loginUser(email, password);
    }
  }

  accountButtonPress() {
    let { accounButtonText, buttonText, loginAdditionalText, signIn } = this.state;

    signIn = !signIn;
    console.log(signIn);
    if (signIn) {
      buttonText = 'SIGN IN'
      accounButtonText = 'Switch to login',
        loginAdditionalText = 'Already have an account?'
    } else {
      buttonText = 'LOG IN'
      accounButtonText = 'Create an Account'
      loginAdditionalText = 'New here?'
    }
    this.setState({ signIn, buttonText, accounButtonText, loginAdditionalText })
  }

  render() {
    const { email, password, email_valid } = this.state;
    const { loading } = this.props;

    return (
      <View style={styles.container}>
        {this.state.fontLoaded ?
          <View style={styles.loginView}>
            <View style={styles.loginTitle}>
              <Text style={[styles.title, { fontWeight: 'bold' }]}>PlanEat</Text>
            </View>
            <View style={styles.loginInput}>
              <View style={{ marginVertical: 15 }}>
                <Input
                  width={230}
                  icon={
                    <Icon
                      name='user-o'
                      color={TEXT_COLOR}
                      size={25}
                    />
                  }
                  onChangeText={email => this.setState({ email })}
                  value={email}
                  inputStyle={{ marginLeft: 10, color: TEXT_COLOR }}
                  keyboardAppearance="light"
                  placeholder="Email"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  ref={input => this.emailInput = input}
                  onSubmitEditing={() => {
                    this.setState({ email_valid: this.validateEmail(email) });
                    this.passwordInput.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor={TEXT_COLOR}
                  displayError={!email_valid}
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                  errorMessage="Please enter a valid email address"
                />
              </View>
              <View style={{ marginVertical: 15 }}>
                <Input
                  width={230}
                  icon={
                    <Icon
                      name='lock'
                      color={TEXT_COLOR}
                      size={25}
                    />
                  }
                  onChangeText={(password) => this.setState({ password })}
                  value={password}
                  inputStyle={{ marginLeft: 10, color: TEXT_COLOR }}
                  secureTextEntry={true}
                  keyboardAppearance="light"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="done"
                  ref={input => this.passwordInput = input}
                  blurOnSubmit={true}
                  placeholderTextColor={TEXT_COLOR}
                  displayError={false}
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                  errorMessage="The email and password you entered did not match out records. Please try again!"
                />
              </View>
            </View>
            <View style={styles.switchView}>
              <Text style={{ color: TEXT_COLOR }}>
                {this.state.loginAdditionalText}
              </Text>
              <Button
                text={this.state.accounButtonText}
                clear
                activeOpacity={0.5}
                textStyle={{ color: TEXT_COLOR, fontSize: 15 }}
                onPress={this.accountButtonPress.bind(this)}
              />
            </View>
            <View style={styles.loginButton}>
              <Button
                text={this.state.buttonText}
                activeOpacity={1}
                underlayColor="transparent"
                onPress={this.submitLoginCredentials.bind(this)}
                loading={loading}
                loadingProps={{ size: 'small', color: 'white' }}
                disabled={!email_valid && password.length < 8}
                buttonStyle={{ height: 50, width: 250, elevation: 0, backgroundColor: SECOND_COLOR, borderWidth: 1, borderColor: 'white', borderRadius: 30 }}
                textStyle={{ fontWeight: 'bold', color: 'white' }}
              />
            </View>
          </View>
          :
          <Text>Loading...</Text>
        }
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  loginView: {
    flex: 1,
    width: 250,
    alignItems: 'center',
  },
  loginTitle: {
    justifyContent: 'center',
    flex: 1.5,
  },
  title: {
    color: SECOND_COLOR,
    fontSize: 30,
  },
  loginInput: {
    flex: 1.2,
  },
  loginButton: {
    flex: 1,
  },
  switchView: {
    flex: 0.4,
    alignItems: 'center',
  }
};


export default AuthScreen;