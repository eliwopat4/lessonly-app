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
	ScrollView,
} from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';
import { FontAwesome } from '@expo/vector-icons';

export default class ReviewFinishedLesson extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	like: '',
	    	wish: '',
	    	wonder: '',
	    }
  	}

  	setInput = (state, txt) => {
  		this.setState({ [state] : txt });
  		this.props.setScreenState(state, txt)
  	}

	render() {
		return (
			<View style={styles.container}>
	      		<Text style={styles.title}> The Derivative Game Review </Text>
				<Text style={styles.title}> Rating </Text>
		        <Image source={Images.FiveStarRating} style={{marginLeft: '8.5%'}}/>
		        <Text style={styles.title}>I Like ...</Text>
		        <TextInput
		            style={styles.input}
		            autoCapitalize = 'none'
		            value={this.props.like}
			      	multiline={true}
			      	onChangeText={(txt) => this.setInput('like', txt)} 
		    	/>
		        <Text style={styles.title}>I Wish ...</Text>
		        <TextInput
          			style={styles.input}
		            autoCapitalize = 'none'
		            value={this.props.wish}
			      	multiline={true}
			      	onChangeText={(txt) => this.setInput('wish', txt)} 
    			/>
		        <Text style={styles.title}>I Wonder ...</Text>
		        <TextInput
          			style={styles.input}
		            autoCapitalize = 'none'
		            value={this.props.wonder}
			      	multiline={true}
			      	onChangeText={(txt) => this.setInput('wonder', txt)} 
    			/>
				<View style={styles.arrowContainer} >
    				<View style={styles.leftArrow} >
	    				<TouchableOpacity onPress={() => this.props.setComponent('AskToReview')} >
	    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    				<View style={styles.rightArrow} >
	    				<TouchableOpacity onPress={() => this.props.setComponent('YourReview')}>
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
		backgroundColor: 'white',
		alignItems: 'flex-start',
	},
	title: {
		width: '80%',
		marginLeft: '10%',
		marginTop: 20,
		fontSize: 25,
		textAlign: 'left',	
	},
	input: {
		shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
		width: '80%',
		height: 80, 
		padding: 10, 
		backgroundColor: 'white',
		marginTop: 20,
	  	borderRadius: 10,
	  	marginLeft: '10%',	
	  },
	arrowContainer: {
		width: '100%',
		justifyContent:'center',
		flexDirection: 'row',
	},
	leftArrow: {
		marginTop: 50,
		marginRight: '25%',
	},
	rightArrow: {
		marginTop: 50,
		marginLeft: '25%',
	},
})