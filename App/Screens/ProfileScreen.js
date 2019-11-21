import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Text,
	Image,
	TouchableOpacity,
	Button,
} from 'react-native';
import { Metrics, Colors, Images } from '../Themes';
import firebase from 'firebase';
import firestore from '../../firebase'
import Header from '../Components/Header';

export default class ProfileScreen extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	
	  	}
  	}


	showCurrentUser() {
		if (firebase.auth().currentUser !== null) {
			alert('Current user is: ' + firebase.auth().currentUser.email);
		} else {
			alert('No user is currently logged in. Error in source code.');
		}
	}


	async logoutUser() {
		await firebase.auth().signOut();
		console.log('Logging out...');
		this.props.navigation.navigate('Loading');
	}
	
	menuAction = (action) => {
  		if (action.localeCompare('OpenDrawer') === 0) {
  			this.props.navigation.toggleDrawer();
  		} else {
  			this.props.navigation.navigate(action)
  		}
  	}

  	componentDidMount() {
  		var screen = this.props.navigation.getParam('screenA', 'null');
  		this.props.navigation.setParams({ 
  			screenA: this.props.navigation.state.routeName,
  			screenB: screen,
  		});
  	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header navigate = {this.menuAction} />
				<Text style={styles.title} > Profile </Text>
				<TouchableOpacity onPress={() => this.showCurrentUser()} >
					<Text style={styles.temp}> Check User </Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.logoutUser()} >
					<Text> Logout </Text>
				</TouchableOpacity>
				<Button onPress={() => console.log(this.props.navigation.state)} title="click" />
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	temp: {
		marginBottom: 100,
	}
})