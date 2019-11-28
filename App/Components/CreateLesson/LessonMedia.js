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
import { Metrics, Colors, Images } from '../../Themes';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import firestore from '../../../firebase'

const rootStore = firebase.storage().ref();

export default class LessonMedia extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	text: 'none',
	  	}
  	}


  	getPermissionAsync = async (permission) => {
		const { status } = await Permissions.askAsync(permission);
		if (status !== 'granted') {
		  alert('Sorry, we need camera roll or camera permissions to make this work!');
		}
  	}

  	uploadImage = async(uri) => {
  		const user = await firebase.auth().currentUser;
  		const userEmail = user.email;
  		console.log(userEmail)
	    const response = await fetch(uri);
	    const blob = await response.blob();
	    console.log(blob)
	    let splitURI = uri.split('/');
	    let filename = splitURI[splitURI.length - 1];
	 //    var pictureRef = rootStore.child(filename);
	 //    var pictureImagesRef = rootStore.child('images/'+filename)
	 //    pictureImagesRef.put(blob).then(function(snapshot) {
		// 	console.log('Uploaded a blob or file!');
		// });
	    // can this just be simplified to blob.name??
	    var ref = firebase.storage().ref().child(userEmail+'/'+filename);
	    //console.log(ref)
	    let task = ref.put(blob);
	    console.log('put blob and returning')
	    return {task, ref};
	    // return 1;
  	};

  // 	testUpload = () => {
  // 		var pictureRef = rootStore.child('fake');
	 //    var pictureImagesRef = rootStore.child('test/'+'fake')
	 //    var blob = {
	 //    	eat: 'my ass',
	 //    };
	 //    pictureImagesRef.put(blob).then(function(snapshot) {
		// 	console.log('Uploaded a blob or file!');
		// });
  // 	}

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

  	rightArrowClicked = () => {
  		this.props.handleAction('media', this.state.text, 'LessonReview');
  	}

  	leftArrowClicked = () => {
  		this.props.handleAction('media', this.state.text, 'LessonInstructions');
  	}

  	uploadDocument = (txt) => {
  		this.setState({ text: txt })
  		this.props.handleAction('media', this.state.text, 'LessonMedia');
  	}

  	noDoc = (txt) => {
  		this.setState({ text: txt });
  		setTimeout(() => {
  			this.props.handleAction('media', this.state.text, 'LessonReview');
  		}, 200);
  	}

	render() {
		return (
			<View style={styles.container} >
      			<Text style={styles.title} > 
      				What
      				<Text style={{fontWeight: 'bold'}}> media content </Text>
      				is necessary for this lesson?
      			</Text>
    			<View style={styles.mediaIcons}>
    				<View style={styles.iconRow}>
		    			<TouchableOpacity style={styles.icon} onPress={() => this.uploadDocument('document')}> 
							<FontAwesome name={'paperclip'} size={ 100 } style={{color: 'black'}} /> 
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon} onPress={() => this.uploadDocument('image')}> 
							<FontAwesome name={'image'} size={ 100 } style={{color: 'black'}} /> 
						</TouchableOpacity>
					</View>
					<View style={styles.iconRow}>
						<TouchableOpacity style={styles.icon} onPress={() => this.uploadDocument('video')}> 
							<FontAwesome name={'play-circle'} size={ 100 } style={{color: 'black'}} /> 
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon} onPress={() => this.uploadDocument('music')}> 
							<FontAwesome name={'music'} size={ 100 } style={{color: 'black'}} /> 
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity style={styles.button} onPress={() => this.noDoc('none')} >
					<Text style={{textAlign:'center', fontSize: 15, color: 'black'}}> None </Text>
				</TouchableOpacity>
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
		marginTop: '10%',
		fontSize: 25,
		marginTop: 50,
		marginBottom: 10,
		textAlign: 'center',	
	},
	mediaIcons: {
		width: '80%', 
		height: '45%',
		padding: 10, 
	  	flexDirection: 'row',
	  	marginBottom: 12,
	  	marginTop: 30,
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
		marginTop: 30,
		marginRight: '25%',
	},
	rightArrow: {
		marginTop: 30,
		marginLeft: '25%',
	},button: {
	    shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
	  	backgroundColor: 'white',
	    height: 40,
	    width: 180,
	    borderRadius: 50,
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexDirection: 'row',
	},
})