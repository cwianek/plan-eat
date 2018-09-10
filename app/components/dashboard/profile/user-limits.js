import React from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { TEXT_COLOR, SECOND_COLOR, PROGRESS_COLOR } from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class UserLimits extends React.Component {
    constructor(props) {
        super(props);
        this.state = { proteins: '' };
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        const { proteins } = this.state;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {
                    <View style={styles.wrapper}>
                        <Text style={styles.sectionText}>Please define your daily limits</Text>
                        
                        <Text>Proteins</Text>
                        <Input
                            
                            width={100}
                            icon={
                                <Icon
                                    name='lock'
                                    color={TEXT_COLOR}
                                    size={25}
                                />
                            }
                            onChangeText={(proteins) => this.setState({ proteins })}
                            value={proteins}
                            inputStyle={{ marginLeft: 10, color: TEXT_COLOR, fontFamily: 'light', textAlign: 'center' }}
                            keyboardAppearance="light"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            returnKeyType="done"
                            ref={input => this.proteinsInput = input}
                            blurOnSubmit={true}
                            placeholderTextColor={TEXT_COLOR}
                        />
                        
                        <Text>Proteins</Text>
                          <Input
                            
                            width={100}
                            icon={
                                <Icon
                                    name='lock'
                                    color={TEXT_COLOR}
                                    size={25}
                                />
                            }
                            onChangeText={(proteins) => this.setState({ proteins })}
                            value={proteins}
                            inputStyle={{ marginLeft: 10, color: TEXT_COLOR, fontFamily: 'light', textAlign: 'center' }}
                            keyboardAppearance="light"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            returnKeyType="done"
                            ref={input => this.proteinsInput = input}
                            blurOnSubmit={true}
                            placeholderTextColor={TEXT_COLOR}
                        />
                        
                          <Input
                            
                            width={100}
                            icon={
                                <Icon
                                    name='lock'
                                    color={TEXT_COLOR}
                                    size={25}
                                />
                            }
                            onChangeText={(proteins) => this.setState({ proteins })}
                            value={proteins}
                            inputStyle={{ marginLeft: 10, color: TEXT_COLOR, fontFamily: 'light', textAlign: 'center' }}
                            keyboardAppearance="light"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            returnKeyType="done"
                            ref={input => this.proteinsInput = input}
                            blurOnSubmit={true}
                            placeholderTextColor={TEXT_COLOR}
                        />
                    </View>
                }
            </ScrollView>
        )
    }
}

const styles = {
    container:{
        alignItems: 'center'
    },
    wrapper:{
       alignItems: 'center'
    },
    sectionText:{
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        fontFamily: 'light',
        textAlign: 'center',
        color: TEXT_COLOR
    }
}