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
} from 'react-native';
import { Metrics, Colors, Images } from '../Themes';
import Header from '../Components/Header';
import TodaysLesson from '../Components/ReviewLesson/TodaysLesson';
import DefaultCalendar from '../Components/ReviewLesson/DefaultCalendar';
import CompletedLesson from '../Components/ReviewLesson/CompletedLesson';
import AskToReview from '../Components/ReviewLesson/AskToReview';
import ReviewFinishedLesson from '../Components/ReviewLesson/ReviewFinishedLesson';
import YourReview from '../Components/ReviewLesson/YourReview';
import ReviewSubmitted from '../Components/ReviewLesson/ReviewSubmitted';
import CalendarPicker from 'react-native-calendar-picker';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import firestore from '../../firebase';

const usersRef = firestore.collection('users');

export default class CalendarScreen extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	currComponent: 'DefaultCalendar',
	    	like: '',
	    	wish: '',
	    	wonder: '',
	    	rating: 0,
	    	hasRated: false,
	    	datePicked: '',
	    	lesson: '',
	    	user: '',
	    }
  	}

  	async componentDidMount() {
  		var user = await firebase.auth().currentUser;
  		let userInfo = await usersRef.doc(user.email).get();
  		// console.log(userInfo.data())
  		this.setState({user: userInfo.data()})
  	}

  	setScreenState = (state, txt) => {
  		if(state === 'cleanup') {
  			this.setState({ 
	  			currComponent: 'ReviewSubmitted',
		    	like: '',
		    	wish: '',
		    	wonder: '',
		    	rating: 0,
		    	hasRated: false,
		    	datePicked: '',
		    	lesson: '',
		    	user: '',
  			})
  		} else {
  			this.setState({ [state] : txt })
  		}
  	}


  	setComponent = (newComponent) => {
  		this.setState({ currComponent: newComponent})
  	}

  	getComponent() {
  		switch(this.state.currComponent) {
		  	case 'DefaultCalendar':
		  		return (<DefaultCalendar setScreenState = {this.setScreenState} setComponent = {this.setComponent} />);
		    	break;
		  	case 'TodaysLesson':
		  		return (<TodaysLesson {...this.state} setScreenState = {this.setScreenState} setComponent = {this.setComponent} />);
		    	break;
		    case 'CompletedLesson':
		  		return (<CompletedLesson setComponent = {this.setComponent} />);
		    	break;
		    case 'AskToReview':
		    	//console.log(this.state.lesson)
		  		return (<AskToReview {...this.state} setComponent = {this.setComponent} navigate = {this.props.navigation.navigate} />);
		    	break;	
		    case 'ReviewFinishedLesson':
		  		return (<ReviewFinishedLesson {...this.state} setComponent = {this.setComponent}  setScreenState = {this.setScreenState}/>);
		    	break;
		    case 'YourReview':
		  		return (<YourReview {...this.state} setComponent = {this.setComponent} setScreenState = {this.setScreenState}/>);
		    	break;	
		    case 'ReviewSubmitted':
		  		return (<ReviewSubmitted setComponent = {this.setComponent} navigate = {this.props.navigation.navigate} />);
		    	break;	
		}
  	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header openDrawer = {this.props.navigation.openDrawer} navigate = {this.props.navigation.navigate} />
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
	title: {
		width: '80%',
		height: '10%',
		marginTop: '10%',
		fontSize: 25,
		marginTop: 50,
		marginBottom: 50,
		textAlign: 'left',	
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
})