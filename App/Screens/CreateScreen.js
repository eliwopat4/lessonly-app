import React from 'react';
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
} from 'react-native';
import { Metrics, Colors, Images } from '../Themes';
import Header from '../Components/Header';
import LessonObjectives from '../Components/CreateLesson/LessonObjectives';
import LessonMaterials from '../Components/CreateLesson/LessonMaterials';
import LessonInstructions from '../Components/CreateLesson/LessonInstructions';
import LessonMedia from '../Components/CreateLesson/LessonMedia';
import LessonReview from '../Components/CreateLesson/LessonReview';
import LessonShare from '../Components/CreateLesson/LessonShare';
import LessonSuccess from '../Components/CreateLesson/LessonSuccess';
import firebase from 'firebase';
import firestore from '../../firebase'

const usersRef = firestore.collection('users');

export default class CreateScreen extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	user: '',
	    	objective: '',
	    	materials: '',
	    	instructions: '',
	    	media: '',
	    	lessonName: '',
	    	confirmation: '',
	    	currComponent: 'LessonObjectives',
	  	}
  	}


  	async componentWillMount() {
  		var user = await firebase.auth().currentUser;
  		let userInfo = await usersRef.doc(user.email).get();
  		// console.log(userInfo.data())
  		console.log(userInfo.data())
  		var userPass = {
  			email: userInfo.data().email,
  			firstName: userInfo.data().firstName,
  			lastName: userInfo.data().lastName,
  		}
  		this.setState({user: userPass})
  	}

  	handleAction = (state, newState, component) => {
  		if (state.localeCompare('cleanup') === 0) {
  			this.setState({
  				objective: '',
		    	materials: '',
		    	instructions: '',
		    	media: '',
		    	lessonName: '',
		    	confirmation: '',
		    	currComponent: 'LessonObjectives',
  			})
  		} else if (component.localeCompare(this.state.currComponent) === 0) {
  			this.setState({ [state]: newState });
  		} else {
  			this.setState({ 
  				[state]: newState,
  				currComponent: component
  			});
  		}
  	}


  	getComponent() {
  		switch(this.state.currComponent) {
		  	case 'LessonObjectives':
		  		return (<LessonObjectives {...this.state} handleAction = {this.handleAction} />);
		    	break;
		  	case 'LessonMaterials':
		  		return (<LessonMaterials {...this.state} handleAction = {this.handleAction} />);
		    	break;
		    case 'LessonInstructions':
		   		return (<LessonInstructions {...this.state} handleAction = {this.handleAction} />);
		    	break;
		    case 'LessonMedia':
		   		return (<LessonMedia {...this.state} handleAction = {this.handleAction} />);
		    	break;
		    case 'LessonReview':
		   		return (<LessonReview {...this.state} handleAction = {this.handleAction} />);
		    	break;
		    case 'LessonShare':
		   		return (<LessonShare {...this.state} handleAction = {this.handleAction} />);
		    	break;
		    case 'LessonSuccess':
		   		return (<LessonSuccess {...this.state} handleAction = {this.handleAction} navigate={this.props.navigation.navigate}/>);
		    	break;
		}
  	}

  	navigate = (screen) => {
  		this.props.screenProps = 'LessonObjectives';
  		this.props.navigation.navigate(screen)
  	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header openDrawer = {this.props.navigation.toggleDrawer} navigate = {this.navigate} />
	  			{this.getComponent()}
			</SafeAreaView>
			
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',	
	},
})