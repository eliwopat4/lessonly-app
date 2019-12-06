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
import firebase from 'firebase';
import firestore from '../../../firebase'

const collRef = firestore.collection('users');
const collRef2 = firestore.collection('lessons');

export default class YourReview extends Component {

	constructor(props) {
	    super(props);
  	}


  	uploadLesson = async () => {
  		
  		var lessons;
  		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date + ',' + time;
  		var lessonObject = {
  			objective: this.props.objective,
  			materials: this.props.materials,
  			instructions: this.props.instructions,
  			media: this.props.media,
  			lessonName: this.props.lessonName,
  			author: this.props.user,
  			rating: 'null',
  			dateCreated: dateTime,
  		}
  		let docRef = firestore.doc('users/'+this.props.user);
		let doc = await docRef.get();
		// console.log(this.props.user, doc.data());
	  	if(doc.data().lessons === undefined) {
	  		lessons = [lessonObject]
	  	} else if (doc.data().lessons.length === 0) {
	  		lessons = [lessonObject]
	  	} else {
	  		lessons = doc.data().lessons
	  		lessons.push(lessonObject)
	  	}
	  	data = { 
			lessons: lessons,
		}
		let setDoc = collRef.doc(this.props.user).update(data);
		let setLesson = collRef2.doc(this.props.lessonName).set(lessonObject);
  	}

  	submitReview = async () => {
  		try {
			user = await firebase.auth().currentUser
		} catch(error) {
			console.log(error.message)
		}
  		this.props.setComponent('ReviewSubmitted')
  	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title} >Your Review</Text>
				<Text style={{fontSize: 25, textAlign: 'center', marginBottom:5}}> Rating </Text>
		        <Image source={Images.FiveStarRating} style={{marginBottom:20}} />
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
		marginRight: 19,
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
		marginBottom: 42,
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