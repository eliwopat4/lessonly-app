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
import StarRating from 'react-native-star-rating';
import firebase from 'firebase';
import firestore from '../../../firebase';

const collRef = firestore.collection('users');
const collRef2 = firestore.collection('lessons');

export default class YourReview extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	review: '',
	    }
  	}

  	uploadReview = async () => {
  		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date + ',' + time;
		var user = {
			email: this.props.user.email,
			firstName: this.props.user.firstName,
			lastName: this.props.user.lastName,
		}
  		var reviewObject = {
  			reviewer: user,
  			like: this.props.like,
  			wish: this.props.wish,
  			wonder: this.props.wonder,
  			rating: this.props.rating,
  			dateCreated: dateTime,
  		}


  		console.log(reviewObject)
  		console.log('Current Lesson being reviewed: ' + this.props.lesson.lessonName)

  		
  		// UPDATE Lesson in Users collection
  		let userRef = firestore.doc('users/'+this.props.lesson.author.email);
		let userInfo = await userRef.get();
		var reviewsCopy = [];
		var userLessons = userInfo.data().lessons;
		var userLessonsCopy = [];
		userLessons.forEach(lesson => {

			if(lesson.lessonName === this.props.lesson.lessonName) {
				//console.log(lesson);
				if(lesson.reviews === undefined) {
			  		lesson.reviews = [reviewObject]
			  	} else if (lesson.lessons.length === 0) {
			  		lesson.reviews = [reviewObject]
			  	} else {
			  		reviewsCopy = lesson.reviews
			  		reviewsCopy.push(reviewsCopy)
			  		lesson.reviews = reviewsCopy;
			  	}
			  	//console.log(lesson);
			}

			userLessonsCopy.append(lesson)
		});
		console.log(typeof userLessonsCopy)

		let setDoc = collRef.doc(this.props.lesson.author.email).update(data);
		let setLesson = collRef2.doc(this.props.lesson.lessonName).set(lessonObject);


		// UPDATE Lesson in Lessons collection
		// let lessonRef = firestore.doc('lessons/'+this.props.lesson.lessonName);
		// let dbLesson = await lessonRef.get();
		// console.log('USER DATA: ')
		// console.log(dbLesson.data())

  	}

  	submitReview = async () => {
  		try {
			user = await firebase.auth().currentUser
		} catch(error) {
			console.log(error.message)
		}
		//await this.uploadReview()
  		this.props.setComponent('ReviewSubmitted')
  	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title} >Your Review</Text>
				<Text style={{fontSize: 25, textAlign: 'center', marginBottom: 10,}}> Rating </Text>
		        <View style={styles.starRating} >
					<StarRating
				        disabled={true}
				        maxStars={5}
				        emptyStar={'ios-star-outline'}
				        fullStar={'ios-star'}
				        halfStar={'ios-star-half'}
				        iconSet={'Ionicons'}
				        rating={this.props.rating}
				        fullStarColor={'darkviolet'}
				    />
			    </View>
		        <View style={styles.scrollview}>
	      			<ScrollView > 
	      				<View style={{alignItems: 'center'}}>
	      					<Text style={styles.body}> The Derivative Game </Text>
	      					<Image source={Images.Stars} style={{marginBottom: '5%',}}/>
	      				</View>
	      				<Text style={styles.body}>I like... <Text style={styles.bodyBold}> {this.props.like} </Text></Text>
	      				<Text style={styles.body}>I wish... <Text style={styles.bodyBold}> {this.props.wish} </Text></Text>
	      				<Text style={styles.body}>I wonder... <Text style={styles.bodyBold}> {this.props.wonder} </Text></Text>
	      			</ScrollView>
      			</View>
      			<View style={styles.arrowContainer} >
      				<View style={styles.leftArrow} >
	    				<TouchableOpacity onPress={() => this.props.setComponent('ReviewFinishedLesson')}> 
	    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    				<LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.button} >
		        		<TouchableOpacity style={ styles.innerButton } onPress={() => this.submitReview() } >
					    	<Text style={{fontSize:20, textAlign:'center'}} > Submit </Text>
						</TouchableOpacity>
					</LinearGradient>
    			</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		alignItems: 'center',
	},
	starRating: {
		marginBottom: 10,
	},
	title: {
		width: '80%',
		marginTop: 20,
		marginBottom: 30,
		fontSize: 25,
		textAlign: 'center',	
	},
	input: {
		shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
		width: '80%',
		height: 80, 
		padding: 10, 
		backgroundColor: 'white',
		marginTop: 20,
	  	borderRadius: 10,
	  	marginLeft: '10%',	
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
		marginBottom: 25,
		marginRight: 50,
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
		// alignItems: 'center',
		justifyContent: 'center',
		// borderWidth: 1,
	},
	leftArrow: {
		marginTop: 14,
		marginRight: 20,
		// borderWidth: 1,
	},
	rightArrow: {
		marginTop: 10,
		marginLeft: '10%',
	},
	scrollview: {
		width: '80%', 
		height: '50%',
		padding: 10, 
		marginBottom: 47,
		backgroundColor: 'white',
	  	borderRadius: 10,	
	  	borderWidth: 1,
	  	shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	backgroundColor: 'white',
	},
	body: {
		fontSize: 25,
		marginBottom: 10,
	},
	bodyBold: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	
})