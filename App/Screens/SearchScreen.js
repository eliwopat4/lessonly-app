import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Text,
	Image,
	View,
	TextInput,
	TouchableOpacity,
	Platform,
	FlatList,
	Button,
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { Metrics, Colors, Images } from '../Themes';
import Header from '../Components/Header';
import firebase from 'firebase';
import firestore from '../../firebase'

const usersRef = firestore.collection('users');

export default class SearchScreen extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	search: '',
	    	users: [],
	    	data: [],
	  	}
  		this.getUsers = this.getUsers.bind(this);
  	}

  	componentWillMount = () => {
  		this.getUsers()
  	}

  	componentWillUnmount() {
  		this.props.navigation.setParams({ 
  			prevScreen: this.props.navigation.state.routeName,
  		});
  	}

  	updateSearch = (txt) => {
		var newData = []
		this.state.users.forEach((user) => {
			if(user.email.includes(txt) || user.password.includes(txt)) {
				newData.push(user)
			}
		});
    	this.setState({
    		search: txt,
    		data: newData,
    	});
  	}

  	async getUsers() {
		let docs = await usersRef.get();
		let usersCopy = [];
		docs.forEach((doc) => {
			user = {
				email: doc.data().email,
				password: doc.data().password
			}
			usersCopy.push(user)
		});	
		this.setState({ users: usersCopy})
		this.setState({ data: usersCopy})
	}

	menuAction = (action) => {
  		if (action.localeCompare('OpenDrawer') === 0) {
  			this.props.navigation.toggleDrawer();
  		} else {
  			this.props.navigation.navigate(action)
  		}
  	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header navigate = {this.menuAction} />
				<Text style={styles.title} > Search Documents </Text>
		    	<SearchBar
					round
					containerStyle={styles.input}
					platform={(Platform.OS === 'ios') ? "ios" : "android"}
					searchIcon={
						{ size: Metrics.small },
						{ color: 'red' }
					}
					value={this.state.search}
		            onChangeText={text => this.updateSearch(text)} 
					placeholder='Search'
		            autoCapitalize = 'none'
				/>
				<Button onPress={() => console.log(this.props.navigation.state)} title="click" />
				<FlatList	
		          	data={this.state.data}
		          	renderItem={({ item }) => (
		            	<Text>{item.email}</Text>
		          	)}
		          	keyExtractor={item => item.email}
		        />

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
		marginBottom: 20,
	},
	input: {
		backgroundColor: 'white',
		marginBottom: 20,
	},
})