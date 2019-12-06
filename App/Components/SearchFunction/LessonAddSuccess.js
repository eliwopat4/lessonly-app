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
import { FontAwesome } from '@expo/vector-icons';

export default class LessonAddSuccess extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	date: '',
	    }
  	}

  	backToHomePage = () => {
  		this.props.handleAction('cleanUp');
  		this.props.navigate('Home')
  	}

  	componentDidMount() {
  		console.log(this.props.datePicked)
  	// 	var res = (this.props.datePicked).split("T");
  	// 	this.setState({ date : res[0]})
  	// }

  	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container} >
      				<Text style={styles.title} > <Text style={{fontWeight: 'bold'}}>  {this.props.lesson.lessonName}</Text> has been added for class on <Text style={{fontWeight: 'bold'}}>{this.props.datePicked} </Text> </Text>
      				<TouchableOpacity onPress={() => this.backToHomePage()} >
      					<FontAwesome name={'check-circle'} size={ 100 } color='purple' /> 
      				</TouchableOpacity>
    			</View>
				<View style={styles.arrowContainer} >
    				<View style={styles.leftArrow} >
	    				<TouchableOpacity > 
	    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    				<View style={styles.rightArrow} >
	    				<TouchableOpacity >
	    					<FontAwesome name={'arrow-right'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    			</View>
			</SafeAreaView>
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
		marginTop: 175,
		marginBottom: 50,
		textAlign: 'center',	
	},
})