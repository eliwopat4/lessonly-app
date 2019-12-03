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
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import Modal from 'react-native-modal';
import firestore from '../../../firebase'

const rootStore = firebase.storage().ref();
const collRef = firestore.collection('users');

export default class LessonReview extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	isModalVisible: false,
	    	error: false,
	    	errorMessage: '',
	    	lessonName: '',
	  	}
  	}


  	leftArrowClicked = () => {
  		this.props.handleAction('lessonName', this.state.text, 'LessonMedia');
  	}

  	rightArrowClicked = () => {
  		this.props.handleAction('lessonName', this.state.text, 'LessonShare');
  	}

	saveLessonName = () => {
		if (this.state.lessonName.length <= 0) {
			this.setState({
				errorMessage: 'Please do not leave your lesson name blank',
				error: true,
			})
		} else if (this.state.lessonName.length > 8) {
			this.setState({
				errorMessage: 'Please choose a lesson name with 8 or less characters',
				error: true,
			})
		} else {
			this.setState({ isModalVisible: false });
			setTimeout(() => {
				this.props.handleAction('lessonName', this.state.lessonName, 'LessonShare')
			}, 1550);
		}
	}

    updateLessonName = (txt) => {
    	this.setState({ lessonName: txt})
    }

    toggleModal = () => {
    	if(this.state.isModalVisible) {
    		this.setState({ 
    			isModalVisible: false,
    			error: false,
    		});
    	} else {
    		this.setState({ isModalVisible: true });
    	}
	}

	removeObject = async (type) => {
		var mediaObject = {
			type: 'none',
			ref: '',
		}
		if(type.localeCompare('image') === 0) {
			console.log(this.props.user+'/'+this.props.media.name)
			var mediaRef = rootStore.child(this.props.user+'/'+this.props.media.name);

			// Delete the file
			mediaRef.delete().then(function() {
			 	console.log('deleted media')
			}).catch(function(error) {
				console.log('error deleting media')
				console.log(error)
			});
			this.props.handleAction('media', mediaObject, 'LessonReview')
		}
	}

	getDocIcon = () => {
		switch(this.props.media.type) {
		  	case 'none':
		  		return (<Text style={{marginBottom: 20}}> None </Text>);
		    	break;
		    case undefined:
		  		return (<Text style={{marginBottom: 20}}> None </Text>);
		    	break;
		    case 'image':
		    	return (
		    		<View style={{alignItems: 'center'}}> 
			    		<Image
					  		source={{uri: this.props.media.ref}}
					  		style={styles.mediaPicture}
						/>
			    		<TouchableOpacity onPress={() => this.removeObject('image')} >
			    			<Text style={styles.removeText}> Remove </Text>
			    		</TouchableOpacity>
		    		</View>
		    	);
		    	break; 
		    case 'video':
		    	return (
		    		<View style={{alignItems: 'center'}}>
			    		<FontAwesome name={'play-circle'} size={ 75 } style={{color: 'black'}} />
			    		<TouchableOpacity onPress={() => this.removeObject('video')} >
			    			<Text style={styles.removeText}> Remove </Text>
			    		</TouchableOpacity>
		    		</View>
		    	);
		    	break; 
		    case 'music':
		    	return (
		    		<View style={{alignItems: 'center'}}>
			    		<FontAwesome name={'music'} size={ 75 } style={{color: 'black'}} />
			    		<TouchableOpacity onPress={() => this.removeObject('music')} >
			    			<Text style={styles.removeText}> Remove </Text>
			    		</TouchableOpacity>
		    		</View>
		    		);
		    	break; 
		    case 'document':
		    	return (
		    		<View style={{alignItems: 'center'}}>
			    		<FontAwesome name={'paperclip'} size={ 75 } style={{color: 'black'}} />
			    		<TouchableOpacity onPress={() => this.removeObject('document')} >
			    			<Text style={styles.removeText}> Remove </Text>
			    		</TouchableOpacity>
		    		</View>
		    		);
		    	break; 
		  	default:
		    	return (<Text style={{marginBottom: 20}}> Error </Text>);
		}
	}

	render() {
		return (
			<View style={styles.container} >
				<Modal
		          isVisible={this.state.isModalVisible}
		          animationInTiming={1500}
		          animationOutTiming={1500}
		          backdropTransitionInTiming={1500}
		          backdropTransitionOutTiming={1500}
		        >
		        	<View style={styles.modalContent} >
		        		<Text style={{fontSize: 20, textAlign: 'center'}}> What would you like to call this masterpiece? </Text>
		        		{
		        			(this.state.error) ?
		        				<Text style={{fontSize: 15, textAlign: 'center', color:'orange', marginTop: 10,}}> {this.state.errorMessage} </Text>
		        				:
		        				null
		        		}
		        		<TextInput 
		        			style={styles.lessonName}
				            onChangeText={(txt) => this.updateLessonName(txt)} 
				            placeholder={'Lesson name'}
				            autoCapitalize = 'none'
			            />
		      	 		<TouchableOpacity style={styles.button} onPress={() => this.saveLessonName()}>
		  	     			<Text style={{fontSize:20}}> Save </Text> 
		  	     		</TouchableOpacity>
		  	     		<TouchableOpacity style={styles.button} onPress={() => this.toggleModal()}>
		  	     			<Text style={{fontSize:20}}> Back </Text> 
		  	     		</TouchableOpacity>
		        	</View>
		        </Modal>

      			<Text style={styles.title} > Here's your lesson plan... </Text>
      			<View style={styles.scrollview}>
	      			<ScrollView > 
	      				<Text style={{fontWeight: 'bold'}}> Objective </Text>
	      				<Text style={{marginBottom: 20}}> {this.props.objective} </Text>
	      				
	      				<Text style={{fontWeight: 'bold'}}> Materials </Text>
	      				<Text style={{marginBottom: 20}}> {this.props.materials} </Text>
	      				
	      				<Text style={{fontWeight: 'bold'}}> Instructions </Text>
	      				<Text style={{marginBottom: 20}}> {this.props.instructions} </Text>
	      				
	      				<Text style={{fontWeight: 'bold'}}> Media </Text>
						{this.getDocIcon()}
	      			</ScrollView>
      			</View>
				<TouchableOpacity style={styles.button} onPress={() => this.toggleModal() } >
		         	<Text style={{fontSize:20}}> Create </Text>
		       	</TouchableOpacity>
    			<View style={styles.arrowContainer} >
    				<View style={styles.leftArrow} >
	    				<TouchableOpacity onPress={() => this.leftArrowClicked() }> 
	    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    				<View style={styles.rightArrow} >
	    				<TouchableOpacity >
	    					<FontAwesome name={'arrow-right'} size={ 50 } style={{color: 'white'}} /> 
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
		height: '10%',
		marginTop: '10%',
		fontSize: 25,
		marginTop: 50,
		textAlign: 'center',	
	},
	scrollview: {
		width: '80%', 
		height: '45%',
		padding: 10, 
		marginBottom: 30,
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
		marginTop: 10,
		marginRight: '25%',
	},
	rightArrow: {
		marginTop: 10,
		marginLeft: '25%',
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
	},
	modalContent: {
	    backgroundColor: 'white',
	    padding: 22,
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderRadius: 4,
	    borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	lessonName: {
		width: '80%', 
		padding: 10, 
		marginTop: 20,
		backgroundColor: 'white',
		marginBottom: 20,
	  	borderRadius: 10,
	  	shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
	  	backgroundColor: 'white',
	},
	mediaPicture: {
		width: 200, 
		height: 200,
		resizeMode: 'contain', 
		alignItems: 'center',
	},
	removeText: {
		fontWeight:'bold', 
		fontSize:15, 
		color:'red', 
		textAlign:'center',
	},
})







