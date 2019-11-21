import React, { Component } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Image,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { Images, Metrics } from '../Themes';
import { FontAwesome } from '@expo/vector-icons';
import {NavigationActions} from 'react-navigation';


export default class CustomDrawer extends Component {

	test = () => {
		console.log('clicked');
	}


	navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

	render() {
		return (
	  		<View style={styles.container}>
	            <View style={styles.headerContainer}>
	            	<View style={styles.picture}>
	            		<Image source={Images.Lorensax} />
	            	</View>
	            	<View style={styles.rating}>
	            		<Text style={{fontWeight: 'bold'}}> Mr. Lorensax </Text>
	            		<Image source={Images.Rating} />
	            	</View>
	            </View>
	            <View style={styles.screenContainer}>
	                <View style={[styles.screenStyle, (this.props.activeItemKey=='Home') ? styles.activeBackgroundColor : null]}>
	                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Home') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Home')}>Home</Text>
	                </View>
	                <View style={[styles.screenStyle, (this.props.activeItemKey=='Profile') ? styles.activeBackgroundColor : null]}>
	                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Profile') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Profile')}>Profile</Text>
	                </View>
	                <View style={[styles.screenStyle, (this.props.activeItemKey=='Create') ? styles.activeBackgroundColor : null]}>
	                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Create') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Create')}>Create</Text>
	                </View>
	                <View style={[styles.screenStyle, (this.props.activeItemKey=='Search') ? styles.activeBackgroundColor : null]}>
	                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Search') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Search')}>Search</Text>
	                </View>
	            </View>
	        </View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
        alignItems: 'center',
        marginTop: 30,
    },
    headerContainer: {
        height: 150,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderBottomColor: 'black', 
        borderBottomWidth: 1
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: { 
        paddingTop: 20,
        width: '100%',
    },
    screenStyle: {
        height: 30,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20, 
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: 'darkorchid'
    },
    activeBackgroundColor: {
        backgroundColor: 'gainsboro'
    },
    picture: {
    	width: 70,
    	height: 70,
        marginLeft: 30,
    },
    rating: {
    	marginLeft: 30,
    }
});
