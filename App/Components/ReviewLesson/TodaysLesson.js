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
	ActivityIndicator,
} from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import firestore from '../../../firebase';

const lessonsRef = firestore.collection('lessons');

export default class TodaysLesson extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	lesson: '',
	    	loading: true,
	    }
	}

  	async componentDidMount() {
		let docs = await lessonsRef.get();
		let lessonsCopy = [];
		docs.forEach((doc) => {
			lesson = {
				lessonName: doc.data().lessonName,
				objective: doc.data().objective,
	  			materials: doc.data().materials,
	  			instructions: doc.data().instructions,
	  			media: doc.data().media,
	  			author: doc.data().author,
	  			rating: 'null',
	  			dateCreated: doc.data().dateCreated,
			}
			lessonsCopy.push(lesson)
		});	
		var array_length = (lessonsCopy.length-1)
		console.log(array_length)
		var index = Math.floor((Math.random() * array_length + 1));
		console.log(index)
		this.setState({ lesson : lessonsCopy[index], loading: false })
		this.props.setScreenState('lesson', lessonsCopy[index])
		// console.log(this.state.lesson)
  	}

  	getDocIcon = () => {
		// console.log(this.state.lesson.media.type)
		// console.log(this.state.lesson.media.ref)
		switch(this.state.lesson.media.type) {
		  	case 'none':
		  		return (<Text style={{marginBottom: 20}}> None </Text>);
		    	break;
		    case undefined:
		  		return (<Text style={{marginBottom: 20}}> None </Text>);
		    	break;
		    case 'image':
		    	console.log(this.state.lesson.media.ref)
		    	//{uri: this.state.lesson.media.ref} 
		    	// {Images.FiveStarRating
		    	return (
		    		<View style={{alignItems: 'center'}}> 
			    		<Image
					  		source={{uri: 'https://firebasestorage.googleapis.com/v0/b/lessonly-5ae13.appspot.com/o/%5Bobject%20Object%5D%2F57BB9398-094D-4D9D-95F1-CC6AA2116A15.jpg?alt=media&token=a60a562d-bd17-428f-97ef-de2a9f9e39d9' }}
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
		if(this.state.lesson.reviews === undefined) {
			return (<Text style={{marginBottom: 20}}> No reviews currently for this lesson. </Text>);
		} else if(this.state.lesson.reviews.length === 0) {
			return (<Text style={{marginBottom: 20}}> No reviews currently for this lesson. </Text>);
		} else {
			return (<Text style={{marginBottom: 20}}> {this.state.lesson.reviews} </Text>);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{
				this.state.loading ? 
				<View style={{marginTop: '60%'}}>
      				<ActivityIndicator size="large" color="#0000ff" />
      			</View>
				:
				<View style={styles.container}>
					<Text style={styles.title} >Today's Lesson</Text>
					<Text style={styles.subtitle} > Lesson: <Text style={{fontWeight: 'bold'}} >{this.state.lesson.lessonName}</Text> </Text>
					<Image source={Images.Rating} style={{marginTop: 10}}/>
	      			<Text style={styles.subtitle} > Created by: <Text style={{fontWeight: 'bold'}} >{this.state.lesson.author.firstName} {this.state.lesson.author.lastName} </Text> </Text>
		            <View style={styles.scrollview}>
		      			<ScrollView > 
		      				<Text style={{fontWeight: 'bold'}}> Objective </Text>
		      				<Text style={{marginBottom: 20}}> {this.state.lesson.objective} </Text>
		      				
		      				<Text style={{fontWeight: 'bold'}}> Materials </Text>
		      				<Text style={{marginBottom: 20}}> {this.state.lesson.materials} </Text>
		      				
		      				<Text style={{fontWeight: 'bold'}}> Instructions </Text>
		      				<Text style={{marginBottom: 20}}> {this.state.lesson.instructions} </Text>
		      				
		      				<Text style={{fontWeight: 'bold'}}> Media </Text>
							{this.getDocIcon()}

							<Text style={{fontWeight: 'bold'}}> Reviews </Text>
							{this.getLessonReviews()}
		      			</ScrollView>
	      			</View>
	    			<View style={styles.arrowContainer} >
	    				<View style={styles.leftArrow} >
		    				<TouchableOpacity onPress={() => this.props.setComponent('DefaultCalendar')}> 
		    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
		    				</TouchableOpacity>
	    				</View>
	    				<LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.button} >
			        		<TouchableOpacity style={ styles.innerButton } onPress={() => this.props.setComponent('CompletedLesson') } >
						    	<Text style={{fontSize:20, textAlign:'center'}} > Start </Text>
							</TouchableOpacity>
						</LinearGradient>
	    				<View style={styles.rightArrow} >
		    				<TouchableOpacity >
		    					<FontAwesome name={'arrow-right'} size={ 50 } style={{color: 'white'}} /> 
		    				</TouchableOpacity>
	    				</View>
	    			</View>
	    		</View>
				}
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
		marginTop: 20,
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
	arrowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	leftArrow: {
		marginTop: 10,
		marginRight: 40,
		marginBottom: 10.
	},
	rightArrow: {
		marginTop: 10,
		marginLeft: '10%',
	},
})