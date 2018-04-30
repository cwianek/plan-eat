import React from 'react';
import { Text, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { RECIPE_ALT, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../dimensions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserRecipes } from '../../../store/recipes/actions'
import { TEXT_COLOR, SECOND_COLOR } from '../../colors';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

class RecipesHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserRecipes()
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
    })

    render() {
        return (
            this.props.userRecipes ?
            <Agenda
                items={
                    this.props.userRecipes
                }
                // callback that gets called when items for a certain month should be loaded (month became visible)
                loadItemsForMonth={(month) => { console.log('trigger items loading') }}
                // callback that fires when the calendar is opened or closed
                onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                // callback that gets called on day press
                onDayPress={(day) => { this.props.getUserRecipes() }}
                // callback that gets called when day changes while scrolling agenda list
                onDayChange={(day) => { console.log('day changed') }}
                // initially selected day
                selected={'2018-04-29'}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2018-01-10'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2018-05-30'}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // specify how each item should be rendered in agenda
                renderItem={(item, firstItemInDay) => { return (<View ><Text>{item.recipe_name}</Text></View>); }}
                // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                renderDay={(day, item) => { return (<View ><Text>{day ? day.day : ''}</Text></View>); }}
                // specify how empty date content with no items should be rendered
                renderEmptyDate={() => { return (<View />); }}
                // specify what should be rendered instead of ActivityIndicator
                renderEmptyData={() => { return (<View><Text>NO CONTENT</Text></View>); }}
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
            :
            <View><Text>Loading</Text></View>
        )
    }
}

const styles = {
}

const mapStateToProps = state => ({
    userRecipes: state.recipes.userRecipes
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserRecipes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesHistory);