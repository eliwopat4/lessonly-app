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
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default class LessonMaterials extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	text: '',
	    	isModalVisible: false,
	  	}
  	}

  	componentWillMount() {
  		this.setState({ text: this.props.materials })
  	}

  	updateText = (txt) => {
  		this.props.handleAction('materials', txt, 'LessonMaterials');
  		this.setState({ text: txt });
  	}

  	rightArrowClicked = () => {
  		if(this.state.text.length === 0) {
  			this.setState({isModalVisible:true})
  		} else {
  			this.props.handleAction('materials', this.state.text, 'LessonInstructions');
  		}
  	}

  	toggleModal = () => {
    	if(this.state.isModalVisible) {
    		this.setState({ 
    			isModalVisible: false,
    		});
    	} else {
    		this.setState({ isModalVisible: true });
    	}
	}

  	leftArrowClicked = () => {
  		this.props.handleAction('materials', this.state.text, 'LessonObjectives');
  	}


	render() {
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
				<View style={styles.container} >
					<Modal
			          isVisible={this.state.isModalVisible}
			          animationInTiming={1500}
			          animationOutTiming={1500}
			          backdropTransitionInTiming={1500}
			          backdropTransitionOutTiming={1500}
			        >
			        	<View style={styles.modalContent} >
			        		<Text style={{fontSize: 20, textAlign: 'center'}}> Please do not leave the materials for this lesson blank. </Text>
			      	 		<TouchableOpacity style={styles.button} onPress={() => this.toggleModal()}>
			  	     			<Text style={{fontSize:20}}> Close </Text> 
			  	     		</TouchableOpacity>
			        	</View>
			        </Modal>
	      			<Text style={styles.title} > What <Text style={{fontWeight: 'bold'}}>materials</Text> do you need for this lesson? </Text>
	      			<TextInput
	          			style={styles.input}
				      	onChangeText={txt => this.updateText(txt)}
				      	value={this.state.text}
				      	placeholder={'Enter materials here'}
				      	multiline={true}
				      	keyboardShouldPersistTaps='handled'
	    			/>
	    			<View style={styles.arrowContainer} >
	    				<View style={styles.leftArrow} >
		    				<TouchableOpacity onPress={() => this.leftArrowClicked()} >
		    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
		    				</TouchableOpacity>
	    				</View>
	    				<View style={styles.rightArrow} >
		    				<TouchableOpacity onPress={() => this.rightArrowClicked()}>
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
	modalContent: {
	    backgroundColor: 'white',
	    padding: 22,
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderRadius: 4,
	    borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	button: {
	    shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
	  	backgroundColor: 'white',
	    height: 40,
	    width: 180,
	    borderRadius: 50,
	    marginBottom: 20,
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexDirection: 'row',
	    marginTop: 20,
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