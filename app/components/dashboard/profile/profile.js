import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Image, ScrollView, View, Header } from 'react-native';
import { SECOND_COLOR, TEXT_COLOR, PROGRESS_COLOR } from '../../colors';
import { ProgressCircle } from 'react-native-svg-charts';
import { Button, List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dailyLimit: 2500, current: 1000 }
    }

    static navigationOptions = {
        header: null,
    }

    showRecipes = () => {
        this.props.navigation.navigate('History', {})
    }

    render() {
        const percents = this.state.current / this.state.dailyLimit;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.sectionTtitle}>Daily goal</Text>
                <ProgressCircle
                    style={{ height: 220, marginTop: 20 }}
                    progress={percents}
                    progressColor={PROGRESS_COLOR}
                    strokeWidth={15}
                />
                <View style={styles.textContainer}>
                    <View style={styles.insideText}>
                        <Text style={styles.percents}>{percents * 100}%</Text>
                        <Text style={styles.progressText}>{this.state.current} kcal of {this.state.dailyLimit} kcal</Text>
                    </View>
                </View>
                <Button
                    clear
                    containerStyle={[styles.dailyRecipesButton]}
                    titleStyle={[styles.dailyRecipesTitle]}
                    title={"Show recipes"}
                    onPress={() => this.showRecipes()}>
                </Button>

                <List containerStyle={{ marginBottom: 20, borderTopWidth: 0 }}>
                    {
                        ['Your limits', 'Settings'].map((l, i) => (
                            <ListItem
                                key={i}
                                title={l}
                                containerStyle={{ borderBottomWidth: 0, marginRight: 15 }}
                                titleStyle={{ fontFamily: 'light', fontSize: 18 }}
                            />
                        ))
                    }
                </List>

            </ScrollView>
        )
    }
}

styles = {
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    textContainer: {
        position: 'absolute',
        left: '50%',
    },
    insideText: {
        position: 'relative',
        top: 140,
        left: '-50%',
        width: 150,
        justifyContent: 'center'
    },
    progressText: {
        fontSize: 12,
        fontFamily: 'light',
        color: TEXT_COLOR,
    },
    percents: {
        fontFamily: 'light',
        fontSize: 50,
        color: PROGRESS_COLOR,
        textAlign: 'center'
    },
    dailyRecipesButton: {
        marginTop: 20,
    },
    dailyRecipesTitle: {
        fontSize: 18,
        fontFamily: 'light',
        color: PROGRESS_COLOR
    },
    sectionTtitle: {
        fontFamily: 'light',
        fontSize: 18,
        padding: 20,
        color: TEXT_COLOR,
    }
}

const mapStateToProps = state => ({
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

