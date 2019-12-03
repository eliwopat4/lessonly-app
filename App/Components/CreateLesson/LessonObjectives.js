import React, { Component } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
	Button,
	View,
} from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';
import { FontAwesome } from '@expo/vector-icons';

export default class LessonObjectives extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	text: '',
	  	}
  	}

  	componentWillMount() {
  		this.setState({ text: this.props.objective })
  		//console.log(this.props)
  	}


  	updateText = (txt) => {
  		this.props.handleAction('objective', txt, 'LessonObjectives');
  		this.setState({ text: txt });
  	}

  	clickedArrow = () => {
  		this.props.handleAction('objective', this.state.text, 'LessonMaterials');
  	}


	render() {
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
				<View style={styles.container} >
	      			<Text style={styles.title} > What are the lesson <Text style={{fontWeight: 'bold'}}>objectives</Text>? </Text>
	      			<TextInput
	          			style={styles.input}
				      	onChangeText={txt => this.updateText(txt)}
				      	value={this.state.text}
				      	placeholder={'Enter objective here'}
				      	multiline={true}
	    			/>
	    			<View style={styles.arrowContainer} >
	    				<View style={styles.leftArrow} >
		    				<TouchableOpacity> 
		    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'white'}} /> 
		    				</TouchableOpacity>
	    				</View>
	    				<View style={styles.rightArrow} >
		    				<TouchableOpacity onPress={() => this.clickedArrow() }>
		    					<FontAwesome name={'arrow-right'} size={ 50 } style={{color: 'black'}} /> 
		    				</TouchableOpacity>
	    				</View>
	    			</View>
	    		</View>
	    	</TouchableWithoutFeedback>
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
		height: '10%',
		marginTop: '10%',
		fontSize: 25,
		marginTop: 50,
		marginBottom: 50,
		textAlign: 'center',	
	},
	input: {
		width: '80%', 
		height: '45%',
		padding: 10, 
		backgroundColor: 'white',
	  	borderRadius: 10,	
	  	borderWidth: 1,
	  	shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	backgroundColor: 'white',
	},
	arrowContainer: {
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