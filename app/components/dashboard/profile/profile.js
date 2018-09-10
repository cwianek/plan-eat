import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Image, ScrollView, View, Header } from 'react-native';
import { SECOND_COLOR, TEXT_COLOR, PROGRESS_COLOR } from '../../colors';
import { ProgressCircle } from 'react-native-svg-charts';
import { Button, List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getCurrentDayRecipes, askByImage } from '../../../store/recipes/actions'


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { dailyLimit: 2500, current: 1000 }
    }

    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        this.props.getCurrentDayRecipes();
    }

    showRecipes = () => {
        this.props.navigation.navigate('History', {})
    }

    itemPressed = (i) => {
        if(i == 0){
            this.props.navigation.navigate('UserLimits',{})
        }
    }

    render() {
        const percents = this.props.currentDayCalories / this.state.dailyLimit;
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
                        <Text numberOfLines={1} style={styles.percents}>{percents * 100}%</Text>
                        <Text style={styles.progressText}>{this.props.currentDayCalories} kcal of {this.state.dailyLimit} kcal</Text>
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
                                onPress={() => this.itemPressed(i)}
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
        width: 160,
        height: 100,
        justifyContent: 'center',
        whiteSpace: 'nowrap'
    },
    progressText: {
        textAlign: 'center',
        top: 20,
        fontSize: 12,
        fontFamily: 'light',
        color: TEXT_COLOR,
    },
    percents: {
        fontFamily: 'light',
        fontSize: 40,
        color: PROGRESS_COLOR,
        textAlign: 'center',
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
    currentDayRecipes: state.recipes.currentDayRecipes,
    currentDayCalories: state.recipes.currentDayCalories
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCurrentDayRecipes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

