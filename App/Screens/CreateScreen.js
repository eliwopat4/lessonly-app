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
import LessonObjectives from '../Components/LessonObjectives';
import LessonMaterials from '../Components/LessonMaterials';
import LessonInstructions from '../Components/LessonInstructions';
import LessonDocuments from '../Components/LessonDocuments';
import LessonReview from '../Components/LessonReview';
import LessonConfirmation from '../Components/LessonConfirmation';
import LessonSuccess from '../Components/LessonSuccess';

export default class CreateScreen extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	objective: '',
	    	materials: '',
	    	instructions: '',
	    	documents: '',
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
		    	documents: '',
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
		    case 'LessonDocuments':
		   		return (<LessonDocuments {...this.state} handleAction = {this.handleAction} />);
		    	break;
		    case 'LessonReview':
		   		return (<LessonReview {...this.state} handleAction = {this.handleAction} />);
		    	break;
		    case 'LessonConfirmation':
		   		return (<LessonConfirmation {...this.state} handleAction = {this.handleAction} />);
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