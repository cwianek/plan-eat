import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Image, ScrollView, View, Header, StyleSheet } from 'react-native';
import { RECIPE_ALT, SCREEN_WIDTH } from '../../dimensions';
import { List, ListItem, Divider, Input, SearchBar, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SECOND_COLOR, TEXT_COLOR } from '../../colors';
import { searchProducts, addUserProduct, loadUserProducts, removeUserProduct } from '../../../store/products/actions'


class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', products: [], owned: false }
    }

    toggleProduct = (l, switched) => {
        switched ? this.props.addUserProduct(l) : this.props.removeUserProduct(l)
    }

    removeProduct = (i) => {
        // const products = this.state.products;
        // products.splice(i, 1);
        // this.setState({ products });
    }

    changeText = (text) => {
        this.setState({ text });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.toggleButtons}>
                    <View style={styles.innerContainer}>
                        <Button
                            clear
                            containerStyle={[styles.toggleButtonContainer, this.state.owned ? { backgroundColor: 'white' } : { backgroundColor: SECOND_COLOR }]}
                            titleStyle={[styles.toggleButtonTitle, this.state.owned ? { color: SECOND_COLOR } : {}]}
                            title={"Search"}
                            onPress={() => { this.setState({ owned: false }) }}>
                        </Button>
                        <Button
                            clear
                            containerStyle={[styles.toggleButtonContainer, !this.state.owned ? { backgroundColor: 'white' } : { backgroundColor: SECOND_COLOR }]}
                            titleStyle={[styles.toggleButtonTitle, !this.state.owned ? { color: SECOND_COLOR } : {}]}
                            title={"Owned"}
                            onPress={() => { this.setState({ owned: true }) }}>
                        </Button>
                    </View>
                </View>
                {
                    !this.state.owned ?
                        <SearchBar
                            value={this.props.text}
                            onChangeText={text => this.changeText(text)}
                            keyboardAppearance="light"
                            lightTheme
                            returnKeyType="search"
                            platform="android"
                            onSubmitEditing={() => this.props.searchProducts(this.state.text)}
                            placeholder='Search product' />

                        :
                        null
                }
                <ScrollView>
                    <List containerStyle={{ marginBottom: 20, borderTopWidth: 0 }}>
                        {
                            !this.state.owned ?
                                this.props.products.map((l, i) => (
                                    <ListItem
                                        key={i}
                                        title={l.food_name}
                                        containerStyle={{ borderBottomWidth: 0 }}
                                        titleStyle={{ fontFamily: 'light' }}
                                        switchButton={true}
                                        hideChevron
                                        switched={this.props.userProducts.filter(product => (product.food_id === l.food_id || product.food_name === l.food_name)).length > 0}
                                        onSwitch={(switched) => this.toggleProduct(l, switched)}
                                    />
                                ))
                                :
                                this.props.userProducts.map((l, i) => (
                                    <ListItem
                                        key={i}
                                        title={l.food_name}
                                        containerStyle={{ borderBottomWidth: 0, marginRight: 15 }}
                                        titleStyle={{ fontFamily: 'light' }}
                                        rightIcon={
                                            <Icon
                                                name={'times'}
                                                color={SECOND_COLOR}
                                                size={22}
                                                onPress={() => this.toggleProduct(l, false)}
                                            />
                                        }
                                    />
                                ))
                        }
                    </List>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toggleButtons: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10
    },
    innerContainer: {
        flexDirection: 'row',
    },
    toggleButtonContainer: {
        marginTop: 20,
        width: 100,
        height: 30,
        borderRadius: 5
    },
    toggleButtonTitle: {
        fontFamily: 'light',
        fontWeight: 'normal'
    }
})

const mapStateToProps = state => ({
    products: state.products.products,
    productsLoading: state.products.productsLoading,
    userProducts: state.products.userProducts
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchProducts, addUserProduct, loadUserProducts, removeUserProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

