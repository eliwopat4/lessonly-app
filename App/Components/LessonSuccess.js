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
import { Metrics, Colors, Images } from '../Themes';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../Components/Header';

export default class LessonSuccess extends Component {

	constructor(props) {
	    super(props);
  	}

  	backToHomePage = () => {
  		this.props.handleAction('cleanup');
  		this.props.navigate('Home')
  	}


	render() {
		return (
			<View style={styles.container} >
      			<Text style={styles.title} > <Text style={{fontWeight: 'bold'}}>Congratulations!</Text> You successfully created an awesome lesson! </Text>
      			<TouchableOpacity onPress={() => this.backToHomePage()} >
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
})