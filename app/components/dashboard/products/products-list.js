import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Image, ScrollView, View, Header } from 'react-native';
import { RECIPE_ALT, SCREEN_WIDTH } from '../../dimensions';
import { List, ListItem, Divider, Input, SearchBar, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SECOND_COLOR } from '../../colors';
import { searchProducts, addUserProduct, loadUserProducts, removeUserProduct } from '../../../store/products/actions'


class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', products: [] }
    }

    toggleProduct = (l, switched) => {
        switched ? this.props.addUserProduct(l) : this.props.removeUserProduct(l)
    }

    removeProduct = (i) => {
        // const products = this.state.products;
        // products.splice(i, 1);
        // this.setState({ products });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    value={this.props.text}
                    onChangeText={text => this.setState({ text })}
                    keyboardAppearance="light"
                    lightTheme
                    returnKeyType="search"
                    platform="android"
                    onSubmitEditing={() => this.props.searchProducts(this.state.text)}
                    placeholder='Search product' />
                <ScrollView>
                    <List containerStyle={{ marginBottom: 20, borderTopWidth: 0 }}>
                        {
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
                        }
                    </List>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    productsLoading: state.products.productsLoading,
    userProducts: state.products.userProducts
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchProducts, addUserProduct, loadUserProducts, removeUserProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

