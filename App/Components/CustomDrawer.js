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
import firebase from 'firebase';
import firestore from '../../firebase'


export default class CustomDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            loading: true,
        }
    }

    async componentDidMount() {
        var user;
        try {
            user = await firebase.auth().currentUser
        } catch(error) {
            console.log(error.message)
        }
        console.log(user.email)
        var userRef = firestore.doc('users/'+user.email)
        let doc = await userRef.get()
        this.setState({ 
            user: doc.data(),
            loading: false,
        });
        console.log(this.state.user)
    }

	navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

    async logoutUser() {
        await firebase.auth().signOut();
        console.log('Logging out...');
        this.props.navigation.navigate('Loading');
    }

	render() {
		return (
	  		<View style={styles.container}>
	            <View style={styles.headerContainer}>
	            	<View style={styles.picture}>
	            		<Image source={Images.Lorensax} />
	            	</View>
                    <View style={styles.name}>
	            	     <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center',}}> {this.state.user.firstName} {this.state.user.lastName} </Text>
                    </View>
	            </View>
	            <View style={styles.screenContainer}>
	                <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='Home') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('Home')}>
	                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Home') ? styles.selectedTextStyle : null]}>Home</Text>
	                </TouchableOpacity>
	                <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='Create') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('Create')}>
	                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Create') ? styles.selectedTextStyle : null]}>Create</Text>
	                </TouchableOpacity>
	                <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='Calendar') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('Calendar')}>
	                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Calendar') ? styles.selectedTextStyle : null]}>Calendar</Text>
	                </TouchableOpacity>
                    <TouchableOpacity style={[styles.screenStyle, (this.props.activeItemKey=='Profile') ? styles.activeBackgroundColor : null]} onPress={this.navigateToScreen('Profile')}>
                        <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Profile') ? styles.selectedTextStyle : null]}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.screenStyle} onPress={() => this.logoutUser()}>
                        <Text style={styles.screenTextStyle} >Logout</Text>
                    </TouchableOpacity>
	            </View>
	        </View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
        alignItems: 'center',
        marginTop: 30,
        // borderWidth: 1,

    },
    headerContainer: {
        height: 150,
        marginTop: 20,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderBottomColor: 'black', 
        borderBottomWidth: 1,
        // borderWidth: 1,
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
        textAlign: 'center',
        // borderWidth: 1,
    },
    selectedTextStyle: {
        // borderWidth: 1,
        // height: 20,
        fontWeight: 'bold',
        color: 'darkorchid',
        alignItems: 'center',
    },
    activeBackgroundColor: {
        height: 40,
        // borderWidth: 1,
        backgroundColor: 'gainsboro'
    },
    picture: {
    	width: 70,
    	height: 70,
        resizeMode: 'center',
        marginLeft: 10,
    },
    name: {
    	marginLeft: 15,
        width: '50%',
        // borderWidth: 1,
    }
});
