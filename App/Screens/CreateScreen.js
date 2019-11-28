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
import LessonObjectives from '../Components/CreateLesson/LessonObjectives';
import LessonMaterials from '../Components/CreateLesson/LessonMaterials';
import LessonInstructions from '../Components/CreateLesson/LessonInstructions';
import LessonMedia from '../Components/CreateLesson/LessonMedia';
import LessonReview from '../Components/CreateLesson/LessonReview';
import LessonShare from '../Components/CreateLesson/LessonShare';
import LessonSuccess from '../Components/CreateLesson/LessonSuccess';

export default class CreateScreen extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	objective: '',
	    	materials: '',
	    	instructions: '',
	    	media: '',
	    	lessonName: '',
	    	confirmation: '',
	    	currComponent: 'LessonObjectives',
	  	}

  	}


  	componentWillUnmount() {
  		this.props.navigation.setParams({ 
  			prevScreen: this.props.navigation.state.routeName,
  		});
  	}


  	handleAction = (state, txt, component) => {
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
  			this.setState({ [state]: txt });
  		} else {
  			this.setState({ 
  				[state]: txt,
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

  	menuAction = (action) => {
  		if (action.localeCompare('OpenDrawer') === 0) {
  			this.props.navigation.toggleDrawer();
  		} else {
  			this.props.navigation.navigate(action)
  		}
  	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header navigate = {this.menuAction} />
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