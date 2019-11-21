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
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class LessonDocuments extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	text: '',
	  	}
  	}


  	getPermissionAsync = async (permission) => {
		const { status } = await Permissions.askAsync(permission);
		if (status !== 'granted') {
		  alert('Sorry, we need camera roll or camera permissions to make this work!');
		}
  	}

  	uploadImage = async(uri) => {
	    const name = await AsyncStorage.getItem('name');
	    const response = await fetch(uri);
	    const blob = await response.blob();
	    let splitURI = uri.split('/');
	    let filename = splitURI[splitURI.length - 1];
	    var ref = firebase.storage().ref().child(name+'/'+filename);
	    let task = ref.put(blob);
	    return {task, ref};
  	};

  	uploadFromCamera = async () => {
	    await this.getPermissionAsync(Permissions.CAMERA);
	    let result = await ImagePicker.launchCameraAsync();
	    if (!result.cancelled) {
	      //uri is the local name of the image on phone
	      let res = await this.uploadImage(result.uri); 

	      //To save where the image is, we can do 2 things.
	      //1) just keep track of the url by putting it in the user data in firebase or locally
	      //2) don't get the url until you need it. i.e., you know the user folder in storage, so why get url right now? Get it when you need it
	      await res.task;
	      let url = await res.ref.getDownloadURL();
	      console.log(url);
	    }
  	}

  	uploadFromLibrary = async () => {
	    await this.getPermissionAsync(Permissions.CAMERA_ROLL);
	    let result = await ImagePicker.launchImageLibraryAsync();
	    if (!result.cancelled) {
	      //uri is the local name of the image on phone
	      let res = await this.uploadImage(result.uri); 

	      //To save where the image is, we can do 2 things.
	      //1) just keep track of the url by putting it in the user data in firebase or locally
	      //2) don't get the url until you need it. i.e., you know the user folder in storage, so why get url right now? Get it when you need it
	      await res.task;
	      let url = await res.ref.getDownloadURL();
	      console.log(url);
	    }
  	}

  	updateText = (txt) => {
  		this.props.handleAction('documents', txt, 'LessonDocuments');
  		this.setState({ text: txt });
  	}

  	rightArrowClicked = () => {
  		this.props.handleAction('documents', this.state.text, 'LessonReview');
  	}

  	leftArrowClicked = () => {
  		this.props.handleAction('documents', this.state.text, 'LessonInstructions');
  	}

  	uploadDocument = () => {
  		alert('Functionality to be finished later or hardcoded in')
  	}


	render() {
		return (
			<View style={styles.container} >
      			<Text style={styles.title} > 
      				Do you have any <Text style={{fontWeight: 'bold'}}>videos</Text>, 
      				<Text style={{fontWeight: 'bold'}}> songs</Text>, or 
      				<Text style={{fontWeight: 'bold'}}> documents</Text> essential
      				 to this lesson? 
      			</Text>
    			<View style={styles.mediaIcons}>
    				<View style={styles.iconRow}>
		    			<TouchableOpacity style={styles.icon} onPress={() => this.uploadDocument()}> 
							<FontAwesome name={'paperclip'} size={ 100 } style={{color: 'black'}} /> 
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon} onPress={() => this.uploadFromLibrary()}> 
							<FontAwesome name={'image'} size={ 100 } style={{color: 'black'}} /> 
						</TouchableOpacity>
					</View>
					<View style={styles.iconRow}>
						<TouchableOpacity style={styles.icon} onPress={() => this.uploadDocument()}> 
							<FontAwesome name={'play-circle'} size={ 100 } style={{color: 'black'}} /> 
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon} onPress={() => this.uploadDocument()}> 
							<FontAwesome name={'music'} size={ 100 } style={{color: 'black'}} /> 
						</TouchableOpacity>
					</View>
				</View>
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
		marginBottom: 30,
		textAlign: 'center',	
	},
	mediaIcons: {
		width: '80%', 
		height: '45%',
		padding: 10, 
	  	flexDirection: 'row',
		justifyContent: 'space-around',
	},
	iconRow: {
		justifyContent: 'space-around',
	},
	icon: {
		height: 125,
		width: 125,
		borderWidth:1,
		justifyContent: 'center',
		alignItems: 'center',
	  	shadowColor: 'gray', 
	    shadowOffset: { height: 2, width: 2 }, 
	    shadowOpacity: 2, 
	    shadowRadius: 2, 
	  	backgroundColor: 'white',
	},
	arrowContainer: {
		flexDirection: 'row',
	},
	leftArrow: {
		marginTop: 70,
		marginRight: '25%',
	},
	rightArrow: {
		marginTop: 70,
		marginLeft: '25%',
	},
})