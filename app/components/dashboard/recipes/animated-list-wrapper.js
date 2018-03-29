import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Button, Animated, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Header } from 'react-navigation';

import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { BG_IMAGE, RECIPE_ALT } from '../../dimensions';
import RecipesSearch from './recipes-search';
import LogoutButton from './logout-button';

const MIN_HEIGHT = 100;
const MAX_HEIGHT = 200;

class AnimatedListWrapper extends Component {
    constructor() {
        super();
        this.state = { showNavTitle: false, searchText: '', scrollY: new Animated.Value(0) };
    }

    changeSearchText = (text) => {
        this.setState({ text });
    }

    get viewOpacity() {
        return this.state.scrollY.interpolate({
            inputRange: [0, MIN_HEIGHT, MAX_HEIGHT - MIN_HEIGHT],
            outputRange: [0.95, 1, 1],
            extrapolate: 'clamp'
        })
    }

    render() {
        return (
            <Animated.View style={{ flex: 1, width: '100%', backgroundColor: 'transparent', opacity: this.viewOpacity }}>
                <StatusBar barStyle="light-content" />
                <HeaderImageScrollView
                    contentContainerStyle={{ backgroundColor: 'transparent' }}
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    maxOverlayOpacity={0}
                    minOverlayOpacity={0}
                    fadeOutForeground
                    onScroll={Animated.event([{
                        nativeEvent:
                            { contentOffset: { y: this.state.scrollY } }
                    }])}
                    //renderHeader={() => <View style={{ backgroundColor: 'rgba(35,35,35,1)', flex: 1 }}><Image source={BG_IMAGE} style={styles.image} /></View>}
                    renderFixedForeground={() => (
                        <Animatable.View
                            style={styles.navTitleView}
                            ref={navTitleView => { this.navTitleView = navTitleView; }}>
                            <RecipesSearch
                                mini={true}
                                searchRecipes={this.props.searchRecipes}
                                text={this.state.text}
                                changeSearchText={this.changeSearchText}
                            />
                        </Animatable.View>
                    )}
                    renderForeground={() => (
                        <View style={styles.titleContainer}>
                            <LogoutButton logoutUser={this.props.logoutUser} />
                            <RecipesSearch
                                text={this.state.text}
                                changeSearchText={this.changeSearchText}
                                searchRecipes={this.props.searchRecipes} />
                        </View>
                    )}>
                    <TriggeringView
                        onHide={() => this.navTitleView.fadeInUp(200)}
                        onDisplay={() => this.navTitleView.fadeOut(100)}>
                    </TriggeringView>
                    {this.props.content}
                </HeaderImageScrollView>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        opacity: 0.5,
        height: MAX_HEIGHT,
        width: Dimensions.get('window').width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        paddingTop: 16,
        opacity: 0,
    },

});

export default AnimatedListWrapper;