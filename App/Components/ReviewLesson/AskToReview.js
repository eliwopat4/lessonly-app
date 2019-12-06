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
	ScrollView,
} from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default class AskToReview extends Component {

	constructor(props) {
	    super(props);

	    this.state ={
	    	lesson: ''
	    }
  	}

  	reset = () => {
  		this.props.setComponent('DefaultCalendar')
  		this.props.navigate('Home')
  	}

  	componentWillMount = () => {
  		this.setState({lesson:this.props.lesson})
  		// console.log(this.state.lesson)
  	}

	getDocIcon = () => {
		// console.log(this.props.lesson.media)
		switch(this.props.lesson.media.type) {
		  	case 'none':
		  		return (<Text style={{marginBottom: 20}}> None </Text>);
		    	break;
		    case undefined:
		  		return (<Text style={{marginBottom: 20}}> None </Text>);
		    	break;
		    case 'image':
		    	return (
		    		<View style={{alignItems: 'center'}}> 
			    		<Image
					  		source={{uri: this.state.lesson.media.ref}}
					  		style={styles.mediaPicture}
						/>
		    		</View>
		    	);
		    	break; 
		    case 'video':
		    	return (
		    		<View style={{alignItems: 'center'}}>
			    		<FontAwesome name={'play-circle'} size={ 75 } style={{color: 'black'}} />
		    		</View>
		    	);
		    	break; 
		    case 'music':
		    	return (
		    		<View style={{alignItems: 'center'}}>
			    		<FontAwesome name={'music'} size={ 75 } style={{color: 'black'}} />
		    		</View>
		    		);
		    	break; 
		    case 'document':
		    	return (
		    		<View style={{alignItems: 'center'}}>
			    		<FontAwesome name={'paperclip'} size={ 75 } style={{color: 'black'}} />
		    		</View>
		    		);
		    	break; 
		  	default:
		    	return (<Text style={{marginBottom: 20}}> None </Text>);
		}
	}

	getLessonReviews = () => {
		if(this.props.lesson.reviews === undefined) {
			return (<Text style={{marginBottom: 20}}> No reviews currently for this lesson. </Text>);
		} else if(this.props.lesson.reviews.length === 0) {
			return (<Text style={{marginBottom: 20}}> No reviews currently for this lesson. </Text>);
		} else {
			return (<Text style={{marginBottom: 20}}> {this.props.lesson.reviews} </Text>);
		}
	}

	render() {
		return (
			<View style={styles.container}> 
				<View style={styles.container}>
					<Text style={styles.title} >Today's Lesson</Text>
					<Text style={styles.subtitle} > Lesson: <Text style={{fontWeight: 'bold'}} >{this.props.lesson.lessonName} </Text> </Text>
					<Image source={Images.Rating} style={{marginTop: 10}}/>
	      			<Text style={styles.subtitle} > Created by: <Text style={{fontWeight: 'bold'}} >{this.props.lesson.author.firstName} {this.props.lesson.author.lastName} </Text> </Text>
		            <View style={styles.scrollview}>
		      			<ScrollView > 
		      				<Text style={{fontWeight: 'bold'}}> Objective </Text>
		      				<Text style={{marginBottom: 20}}> {this.props.lesson.objective} </Text>
		      				
		      				<Text style={{fontWeight: 'bold'}}> Materials </Text>
		      				<Text style={{marginBottom: 20}}> {this.props.lesson.materials} </Text>
		      				
		      				<Text style={{fontWeight: 'bold'}}> Instructions </Text>
		      				<Text style={{marginBottom: 20}}> {this.props.lesson.instructions} </Text>
		      				
		      				<Text style={{fontWeight: 'bold'}}> Media </Text>
							{this.getDocIcon()}

							<Text style={{fontWeight: 'bold'}}> Reviews </Text>
							{this.getLessonReviews()}
		      			</ScrollView>
	      			</View>
	      			<LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.button} >
		        		<TouchableOpacity style={ styles.innerButton } onPress={() => this.props.setComponent('ReviewFinishedLesson') } >
					    	<Text style={{fontSize:20, textAlign:'center'}} > Yes! </Text>
						</TouchableOpacity>
					</LinearGradient>
					<TouchableOpacity style={styles.textLink} onPress={() => this.reset() } >
			         	<Text style={{textDecorationLine: 'underline', fontSize: 13, fontWeight: 'bold'}}> No thanks, I have no feedback </Text>
			       	</TouchableOpacity>
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
		fontSize: 25,
		marginTop: 30,
		textAlign: 'center',	
	},
	subtitle: {
		width: '80%',
		fontSize: 20,
		marginTop: 10,
		textAlign: 'center',
	},
	scrollview: {
		width: '80%', 
		height: '50%',
		padding: 10, 
		marginBottom: 30,
		backgroundColor: 'white',
	  	borderRadius: 10,	
	  	borderWidth: 1,
	  	shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	backgroundColor: 'white',
	  	marginTop: 10,
	},
	button: {
	    shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	backgroundColor: 'white',
	    height: 40,
	    width: 180,
	    borderRadius: 20,
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexDirection: 'row',
		marginTop: 10,
		marginBottom: 20,
	},
	innerButton: {
	    height: 35,
	    width: 175,
	    borderRadius: 20,
	  	backgroundColor: 'white',
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexDirection: 'row',
		marginTop: 50,
		marginBottom: 50,
		shadowColor: 'gray', 
	},
	textLink: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})