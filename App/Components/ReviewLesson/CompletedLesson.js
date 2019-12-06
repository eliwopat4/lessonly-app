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

export default class CompletedLesson extends Component {

	constructor(props) {
	    super(props);
  	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.container} >
      				<Text style={styles.title} > <Text style={{fontWeight: 'bold'}}>The Derivative Game</Text></Text>
					<Text style={styles.subtitle} >Lesson Complete!</Text>
      				<TouchableOpacity onPress={() => this.props.setComponent('AskToReview')} >
      					<FontAwesome name={'check-circle'} size={ 100 } color='purple' /> 
      				</TouchableOpacity>
    			</View>
				<View style={styles.arrowContainer} >
    				<View style={styles.leftArrow} >
	    				<TouchableOpacity > 
	    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    				<View style={styles.rightArrow} >
	    				<TouchableOpacity >
	    					<FontAwesome name={'arrow-right'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    			</View>
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