import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Text,
	Image,
	View,
	TextInput,
	TouchableOpacity,
	Platform,
	FlatList,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { Metrics, Colors, Images } from '../Themes';
import { SearchBar } from 'react-native-elements'
import Header from '../Components/Header';
import DefaultSearch from '../Components/DefaultSearch';
import SearchLessons from '../Components/SearchLessons';
import LessonOverview from '../Components/LessonOverview';
import Calendar from '../Components/Calendar';
import firebase from 'firebase';
import firestore from '../../firebase'

const usersRef = firestore.collection('lessons');

export default class HomeScreen extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	search: '',
	    	lessons: [],
	    	data: [],
	    	currComponent: 'DefaultSearch',
	    	lesson: ''
	  	}
  	}

	handleAction = (state, newState, component) => {
		// console.log('stateChange: '+state+' to '+newState)
		// console.log('update component to: '+component)
		if(state.localeCompare('currComponent') === 0) {
			this.setState({ [state]: newState });
		} else if (state.localeCompare('cleanUp') === 0) {
  			this.setState({
  				search: '',
		    	lessons: [],
		    	currComponent: 'DefaultSearch',
		    	lesson: '',
  			})
  		} else if (component.localeCompare(this.state.currComponent) === 0) {
  			console.log('updating '+state+'...');
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
		  	case 'DefaultSearch':
		  		return (<DefaultSearch {...this.state} handleAction = {this.handleAction} />);
		    	break;
		  	case 'SearchLessons':
		  		return (<SearchLessons {...this.state} handleAction = {this.handleAction} />);
		    	break;
		    case 'LessonOverview':
		  		return (<LessonOverview {...this.state} handleAction = {this.handleAction} navigate = {this.props.navigation.navigate}/>);
		    	break;
		     case 'Calendar':
		  		return (<Calendar {...this.state} handleAction = {this.handleAction} navigate = {this.props.navigation.navigate}/>);
		    	break;
		}
  	}

  	printStates = () => {
  		console.log(this.state.search);
  		// console.log(this.state.lessons);
  		// console.log(this.state.data);
  		console.log(this.state.currComponent);
  	}

  	navigate = (screen) => {
  		this.props.screenProps = 'LessonObjectives';
  		this.props.navigation.navigate(screen)
  	}

	render() {
		return (

			<SafeAreaView style={styles.container}>
				<Header openDrawer = {this.props.navigation.toggleDrawer} navigate = {this.navigate}/>
				{this.getComponent()}
			</SafeAreaView>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: 'white',
		alignItems: 'center',	
	},
	title: {
		marginTop: 20,
		fontSize: 30,
		fontWeight: 'bold',
	},
	input: {
		marginTop: 40,
		backgroundColor: 'white',
		marginBottom: 20,
	},
	boxContainer: {
		width: '80%',
		height: '50%',
		flexDirection: 'row',
		justifyContent: 'space-around'
	}, 
	box1: {
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		height: 170,
		width: 150,
		borderRadius: 10,
		backgroundColor: 'royalblue',
	},
	box2: {
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		height: 170,
		width: 150,
		borderRadius: 10,
		backgroundColor: 'fuchsia',
	},
	box3: {
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		height: 250,
		width: 150,
		borderRadius: 10,
		backgroundColor: 'darkviolet',
	},
	box4: {
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
		width: 150,
		borderRadius: 10,
		backgroundColor: 'dodgerblue',
	},
	column1: {
		justifyContent: 'space-around',
	},
	column2: {
		justifyContent: 'space-around',
	},
	boxText: {
		textAlign: 'center', 
		fontWeight: 'bold',
		color: 'white',
		padding: 10,
	},

})



