import React from 'react';
import { Text, Image, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { RECIPE_ALT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../dimensions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserRecipes, askByImage } from '../../../store/recipes/actions'
import { TEXT_COLOR, SECOND_COLOR, PROGRESS_COLOR } from '../../colors';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera, Permissions, ImagePicker } from 'expo';

class RecipesHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            openCamera: false,
        }
    }

    componentWillMount = () => {
        this.props.getUserRecipes();
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
    })

    openCamera() {
        var self = this;
        Permissions.askAsync(Permissions.CAMERA).then(function (status) {
            self.setState({ hasCameraPermission: status === 'granted', openCamera: true });
        }, function (error) {
            console.log(error);
        });
    }

    openImage = async () => {
        const { cancelled, uri, base64 } = await ImagePicker.launchImageLibraryAsync({ base64: true });
        if (!cancelled) {
            this.props.askByImage(base64, this.props.screenProps.tabChange);
        }
    }

    render() {
        return (
            this.state.openCamera ?
                <Camera style={{ flex: 1 }} type={this.state.type}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back,
                                });
                            }}>
                            <Text
                                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                {' '}Flip{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                :
                this.props.userRecipes ?
                    <View
                        style={{ flex: 1 }}>
                        <Agenda
                            items={
                                this.props.userRecipes
                            }
                            // callback that gets called when items for a certain month should be loaded (month became visible)
                            loadItemsForMonth={(month) => { console.log('trigger items loading') }}
                            // callback that fires when the calendar is opened or closed
                            onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                            // callback that gets called on day press
                            onDayPress={(day) => { this.props.getUserRecipes(day) }}
                            // callback that gets called when day changes while scrolling agenda list
                            onDayChange={(day) => { console.log('day changed') }}
                            // initially selected day
                            selected={new Date()}
                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                            minDate={'2018-01-10'}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            maxDate={'2018-06-30'}
                            // Max amount of months allowed to scroll to the past. Default = 50
                            pastScrollRange={50}
                            // Max amount of months allowed to scroll to the future. Default = 50
                            futureScrollRange={50}
                            // specify how each item should be rendered in agenda
                            renderItem={(item, firstItemInDay) => {
                                return (
                                    <View>
                                        {
                                            firstItemInDay ?
                                                <View>
                                                    <View style={styles.itemHeader}>
                                                        <Text style={styles.titleText}>Carbs</Text>
                                                        <Text style={styles.titleText}>Protein</Text>
                                                        <Text style={styles.titleText}>Fat</Text>
                                                        <Text style={styles.titleText}>Total</Text>
                                                    </View>
                                                </View>
                                                :
                                                null
                                        }
                                        <View style={styles.itemDetails}>
                                            < Text style={styles.itemName}>{item.recipe_name}</Text>
                                            <View style={styles.valuesContainer}>
                                                <Text style={styles.itemValue}>{item.serving_sizes.serving.carbohydrate}g</Text>
                                                <Text style={styles.itemValue}>{item.serving_sizes.serving.protein}g</Text>
                                                <Text style={styles.itemValue}>{item.serving_sizes.serving.fat}g</Text>
                                                <Text style={styles.itemValue}>{item.serving_sizes.serving.calories}Kcal</Text>
                                            </View>
                                        </View >
                                    </View>
                                );
                            }}
                            // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                            renderDay={(day, item) => { return (<View ><Text></Text></View>); }}
                            // specify how empty date content with no items should be rendered
                            renderEmptyDate={() => { return (<View />); }}
                            // specify what should be rendered instead of ActivityIndicator
                            renderEmptyData={() => { return (<View><Text></Text></View>); }}
                            // specify your item comparison function for increased performance
                            rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}

                            hideKnob={false}
                            // Hide knob button. Default = false
                            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                            markedDates={{
                                '2018-04-29': { selected: true, marked: true },
                                '2018-04-30': { marked: true },
                                '2018-04-17': { disabled: true }
                            }}
                            // agenda theme
                            theme={{
                                agendaDayTextColor: 'yellow',
                                agendaDayNumColor: 'green',
                                agendaTodayColor: 'red',
                                agendaKnobColor: SECOND_COLOR
                            }}
                            // agenda container style
                            style={{ flex: 1 }}
                        />
                        <ActionButton
                            size={48}
                            offsetY={20}
                            buttonColor={SECOND_COLOR}>
                            <ActionButton.Item
                                textContainerStyle={{ backgroundColor: '#9b59b6' }}
                                textStyle={styles.actionTextStyle}
                                buttonColor='#9b59b6'
                                title="Recipe from photo"
                                onPress={this.openCamera.bind(this)}>
                                <Icon
                                    name="camera"
                                    style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item
                                textContainerStyle={{ backgroundColor: '#3498db' }}
                                textStyle={styles.actionTextStyle}
                                buttonColor='#3498db'
                                title="Recipe from image"
                                onPress={this.openImage.bind(this)}>
                                <Icon
                                    name="image"
                                    style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item
                                textContainerStyle={{ backgroundColor: '#1abc9c' }}
                                textStyle={styles.actionTextStyle}
                                buttonColor='#1abc9c'
                                title="Manual macronutrient"
                                onPress={() => { }}>
                                <Icon
                                    name="hand-paper-o"
                                    style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                        </ActionButton>
                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color={SECOND_COLOR} />
                    </View>
        )
    }
}

const styles = {
    itemDetails: {
        backgroundColor: 'white',
        marginVertical: 2,
        elevation: 1,
    },
    titleText: {
        color: TEXT_COLOR,
        textAlign: 'center',
        width: SCREEN_WIDTH / 4,
        fontSize: 18,
        fontFamily: 'light'
    },
    itemHeader: {
        marginTop: 5,
        flexDirection: 'row',
    },
    itemName: {
        paddingTop: 10,
        marginLeft: 25,
        fontSize: 14,
        fontFamily: 'light'
    },
    itemValue: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 5,
        fontFamily: 'light',
        width: SCREEN_WIDTH / 4,
    },
    valuesContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    actionTextStyle: {
        color: 'white',
    }, textContainerStyle: {
        backgroundColor: SECOND_COLOR,
    }
}

const mapStateToProps = state => ({
    userRecipes: state.recipes.userRecipes,
    currentRecipe: state.recipes.currentRecipe
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserRecipes, askByImage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesHistory);