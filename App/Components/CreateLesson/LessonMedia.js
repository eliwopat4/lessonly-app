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
	ActivityIndicator
} from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import firebase from 'firebase';
import firestore from '../../../firebase'

const rootStore = firebase.storage().ref();
const collRef = firestore.collection('users');
  
export default class LessonMedia extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	media: '',
	    	loading: false,
	    	isModalVisible: false,
	  	}
  	}

  	componentDidMount() {
  		this.setState({media: this.props.media})
  	}

  	getPermissionAsync = async (permission) => {
		const { status } = await Permissions.askAsync(permission)
		if (status !== 'granted') {
		  alert('Sorry, we need camera roll or camera permissions to make this work!')
		}
  	}

  	uploadImage = async(uri) => {
	    console.log('uploading image to storage...')
	    const response = await fetch(uri);
	    const blob = await response.blob();
	    let splitURI = uri.split('/');
	    let filename = splitURI[splitURI.length - 1];
	    var ref = rootStore.child(this.props.user.email+'/'+filename);
	    let task = ref.put(blob);
	    return {task, ref, filename};
  	}

  	uploadFromLibrary = async () => {
	    await this.getPermissionAsync(Permissions.CAMERA_ROLL);
	    let result = await ImagePicker.launchImageLibraryAsync();
	    if (!result.cancelled) {
  			this.setState({loading: true})
	      	let res = await this.uploadImage(result.uri); 
	      	await res.task;
      		let url = await res.ref.getDownloadURL();
	      	var mediaObject = {
	      		type: 'image',
	      		ref: url,
	      		name: res.filename,
	      	}
  			this.setState({
  				loading: false, 
  				isModalVisible: true,
  				media: mediaObject,
  			})
	    }
  	}

  	rightArrowClicked = () => {
  		this.props.handleAction('media', this.state.media, 'LessonReview');
  	}

  	leftArrowClicked = () => {
  		this.props.handleAction('media', this.state.media, 'LessonInstructions');
  	}

  	uploadMedia = (mediaType) => {
  		var mediaObject = {
  			type: mediaType,
  			ref: '',
  			name: '',
  		}
  		this.setState({ media: mediaObject })
  		setTimeout(() => {
  			this.props.handleAction('media', this.state.media, 'LessonReview');
  		}, 500);
  	}

  	noDoc = (mediaType) => {
  		var mediaObject = {
  			type: mediaType,
  			ref: '',
  			name: '',
  		}
  		this.setState({ media: mediaObject });
  		setTimeout(() => {
  			this.props.handleAction('media', this.state.media, 'LessonReview');
  		}, 500);
  	}

  	closeModal = () => {
  		this.setState({isModalVisible: false})
  		this.props.handleAction('media', this.state.media, 'LessonReview');
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
		        		<Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}> Successfully uploaded!! </Text>
		        		<TouchableOpacity style={styles.button} onPress={() => this.closeModal()} >
							<Text style={{textAlign:'center', fontSize: 15, color: 'black'}}> Close </Text>
						</TouchableOpacity>
		        	</View>
		        </Modal>
      			<Text style={styles.title} > 
      				What
      				<Text style={{fontWeight: 'bold'}}> media content </Text>
      				is necessary for this lesson?
      			</Text>
      			{
      				this.state.loading ?
      				<View style={styles.mediaIcons}>
      					<ActivityIndicator size="large" color="#0000ff" />
      				</View>
      				 :
      				<View style={styles.mediaIcons}>
	    				<View style={styles.iconRow}>
			    			<TouchableOpacity style={styles.icon} onPress={() => this.uploadMedia('document')}> 
								<FontAwesome name={'paperclip'} size={ 100 } style={{color: 'black'}} /> 
							</TouchableOpacity>
							<TouchableOpacity style={styles.icon} onPress={() => this.uploadFromLibrary()}> 
								<FontAwesome name={'image'} size={ 100 } style={{color: 'black'}} /> 
							</TouchableOpacity>
						</View>
						<View style={styles.iconRow}>
							<TouchableOpacity style={styles.icon} onPress={() => this.uploadMedia('video')}> 
								<FontAwesome name={'play-circle'} size={ 100 } style={{color: 'black'}} /> 
							</TouchableOpacity>
							<TouchableOpacity style={styles.icon} onPress={() => this.uploadMedia('music')}> 
								<FontAwesome name={'music'} size={ 100 } style={{color: 'black'}} /> 
							</TouchableOpacity>
						</View>
					</View>
      			}
    			
				<TouchableOpacity style={styles.button} onPress={() => this.uploadMedia('none')} >
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
	    justifyContent: 'center',
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
})