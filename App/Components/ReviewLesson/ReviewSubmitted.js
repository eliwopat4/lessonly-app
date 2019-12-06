import React, { Component } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Button,
	View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class ReviewSubmitted extends Component {

	constructor(props) {
	    super(props);
  	}

  	done = () => {
  		this.props.setComponent('DefaultCalendar')
  		this.props.navigate('Home')
  	}


	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title} >Review Submitted!</Text>
  				<TouchableOpacity onPress={() => this.done()} >
  					<FontAwesome name={'check-circle'} size={ 100 } color='purple' /> 
  				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',	
	},
	title: {
		width: '80%',
		marginTop: '10%',
		fontSize: 25,
		marginTop: 175,
		marginBottom: 50,
		textAlign: 'center',	
	},
	subtitle: {
		width: '80%',
		fontSize: 25,
		marginTop: 50,
		marginBottom: 50,
		textAlign: 'center',	
	},
})