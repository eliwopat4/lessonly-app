import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Text,
	Button,
	TouchableOpacity,
	Image,
	View,
	TextInput,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import firestore from '../../firebase'
import { Metrics, Colors, Images } from '../Themes';
import Modal from 'react-native-modal';

const collRef = firestore.collection('users');

export default class LoginScreen extends React.Component {

	constructor(props) {
    	super(props);

    	this.state = {
	    	email: '',
	    	password: '',
	    	isModalVisible: false,
	    	modalMessage: '',
  		}

  		this.loginUser = this.loginUser.bind(this);
  	}


	updateEmail = (txt) => {
    	this.setState({email: txt})
  	}


	updatePassword = (txt) => {
  		this.setState({password: txt})
	}


	async loginUser(email, password) {
		/*
			***********************************************************
		*/
		var user;
		try {
			user = await firebase.auth().currentUser
		} catch(error) {
			this.createModal(error.message)
		}
    	if (user !== null) {
			try {
				await firebase.auth().signOut()
			} catch(error) {
				this.createModal(error.message)
			}
    	}
        /*
			***********************************************************
		*/
		try {
			await firebase.auth().signInWithEmailAndPassword(email, password)
		} catch(error) {
			this.createModal(error.message)
		}

		try {
			user = await firebase.auth().currentUser
		} catch(error) {
			this.createModal(error.message)
		}
		if (user === null) { return };
		if ((user.email).localeCompare(email) === 0) {
			console.log('Logging in...');
			this.props.navigation.navigate('MainApp');
    	}	
  	}


	loginAttempt(email, password) {
		if (email.length === 0 || password.length === 0) {
			this.createModal('Please do not leave email and/or password blank.')
		} else {
			this.loginUser(email, password);
		}
	}


	async addUserToDatabase(email, password) {
		let data = { 
			email: email, 
			password: password,
		};
		let setDoc = collRef.doc(email).set(data);
	}


	async readUsers() {
  		let docs = await collRef.get();
		docs.forEach((doc) => console.log(doc.data()));
	}


	toggleModal = () => {
	    this.setState({ isModalVisible: !this.state.isModalVisible });
	}

	createModal(message) {
		this.setState({
			modalMessage: message,
			isModalVisible: true,
		});
	}

	render() {
		return (
			<LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.container}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.container}>
					<View style={styles.container}>
						<Modal
					      	isVisible={this.state.isModalVisible}
					      	animationInTiming={1500}
					      	animationOutTiming={1500}
					      	backdropTransitionInTiming={1500}
					      	backdropTransitionOutTiming={1500}
					    >
					    	<LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.modalContent}>
						    		<Text style={styles.modalText}> {this.state.modalMessage} </Text>
						  	 		<TouchableOpacity style={styles.modalButton} onPress={() => this.toggleModal()}>
							     		<Text> Close </Text> 
							     	</TouchableOpacity>
					    	</LinearGradient>
					    </Modal>
			  			<Image source={Images.LessonlyWhiteBulb} style={styles.lessonlyBulb} /> 
						<Text style={styles.loginLabel}> Login </Text>
						<TextInput
				            style={styles.input}
				            onChangeText={(txt) => this.updateEmail(txt)} 
				            placeholder={'Email'}
				            autoCapitalize = 'none'
				    	/>
				        <TextInput
				            style={styles.input}
				            onChangeText={(txt) => this.updatePassword(txt)} 
				            placeholder={'Password'}
				            secureTextEntry={true}
				            autoCapitalize = 'none'
				        />
				        <TouchableOpacity style={styles.button} onPress={() => this.loginAttempt(this.state.email, this.state.password) } >
				         	<Text> Login </Text>
				       	</TouchableOpacity>
				       	<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup') } >
				         	<Text> Sign Up </Text>
				       	</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
			</LinearGradient>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		alignItems: 'center',

	},
	input: {
		shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
		width: '80%', 
		padding: 10, 
		backgroundColor: 'white',
		marginBottom: 20,
	  	borderRadius: 10,	
	  },
	loginLabel: {
		fontSize: 50, 
		marginBottom: 20,
		color: 'white', 
	},
	button: {
		shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
	    alignItems: 'center',
	    backgroundColor: 'white',
		marginBottom: 20,
	    padding: 10,
	    borderRadius: 20,
  	},
  	lessonlyBulb: {
  		marginTop: '50%'
  	},
  	modalContent: {
  		backgroundColor: 'white',
	    padding: 22,
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderRadius: 10,
	    borderColor: 'rgba(0, 0, 0, 0.1)',
  	},
  	modalButton: {
	    shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
	    alignItems: 'center',
	    backgroundColor: 'white',
	    padding: 10,
	    borderRadius: 20,
	},
	modalText: {
		fontSize: 20, 
		color: 'white',
		textAlign: 'center',
		marginBottom: 20,
	}
})







