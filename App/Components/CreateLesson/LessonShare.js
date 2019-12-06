import React, { Component } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableHighlight,
	Image,
	Button,
	View,
} from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import firestore from '../../../firebase'

const collRef = firestore.collection('users');
const collRef2 = firestore.collection('lessons');

export default class LessonShare extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	text: '',
	    	pressStatus: false,
	    	pressedGroup1: false,
	    	pressedGroup2: false,
	    	pressedGroup3: false,
	  	}
  	}

  	leftArrowClicked = () => {
  		this.props.handleAction('confirmation', this.state.text, 'LessonReview');
  	}

  	uploadLesson = async () => {
  		var lessons;
  		//console.log(this.props.user.firstName)
  		//console.log(this.props.user.lastName)
  		var user = {
  			email: this.props.user.email,
  			firstName: this.props.user.firstName,
  			lastName: this.props.user.lastName,
  		};
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
  			author: user,
  			rating: 'null',
  			dateCreated: dateTime,
  		}
  		//console.log('users/'+this.props.user.email)
  		let docRef = firestore.doc('users/'+this.props.user.email);
		let doc = await docRef.get();
		console.log(doc.data());
	  	if(doc.data().lessons === undefined) {
	  		lessons = [lessonObject]
	  	} else if (doc.data().lessons.length === 0) {
	  		lessons = [lessonObject]
	  	} else {
	  		lessons = doc.data().lessons
	  		lessons.push(lessonObject)
	  	}
	  	var data = { 
			lessons: lessons,
		}
		//console.log(data)
		//let setDoc = collRef.doc(this.props.user.email).update(data);

		let testRef = firestore.collection('users/'+this.props.user.email+'/lessons').doc(lessonObject.lessonName);
		let test = testRef.set(lessonObject);
		let setLesson = collRef2.doc(this.props.lessonName).set(lessonObject);
  	}

  	completed = () => {
  		this.uploadLesson()
  		this.props.handleAction('confirmation', this.state.text, 'LessonSuccess');
  	}

  	updateText = (txt) => {
  		this.props.handleAction('confirmation', txt, 'LessonShare');
  		this.setState({ text: txt });
  	}

  	toggleButton() {
	    this.setState({ pressStatus: !this.state.pressStatus });
	}

	toggleGroupStyle(group) {
		switch(group) {
		  	case 'pressedGroup1':
		  		var value = !this.state.pressedGroup1
				this.setState({ [group]: value });
		    	break;
		  	case 'pressedGroup2':
		  		var value = !this.state.pressedGroup2
				this.setState({ [group]: value });
		    	break;
		  	case 'pressedGroup3':
		  		var value = !this.state.pressedGroup3
				this.setState({ [group]: value });
		    	break;
		}
		
	}

	render() {
		return (
			<View style={styles.container} >
      			<Text style={styles.mainTitle} > Would you like to <Text style={{fontWeight: 'bold'}}>share</Text> your lesson- <Text style={{fontWeight:'bold'}}>{this.props.lessonName}</Text>? </Text>
    			{
	           	(this.state.pressStatus) ?
			        <LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.button} >
			        	<TouchableOpacity style={ styles.innerButton } onPress={() => this.toggleButton()} >
						    <Text style={{fontSize:20, textAlign:'center'}} > Make Public </Text>
						</TouchableOpacity>
					</LinearGradient>
					:
					<TouchableOpacity style={ styles.button } onPress={() => this.toggleButton()} >
					    <Text style={{fontSize:20, textAlign:'center'}} > Make Public </Text>
					</TouchableOpacity>
				}
		       	<Text style={styles.title} > Share with your groups... </Text>
		       	<View style={styles.groups}>

		       	{(this.state.pressedGroup1) ?
			        <LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.group} >
			        	<TouchableOpacity style={ styles.innerGroup } onPress={() => this.toggleGroupStyle('pressedGroup1')} >
						    <Text style={styles.groupName}> NYC Public Schools </Text>
						</TouchableOpacity>
					</LinearGradient>
					:
					<TouchableOpacity style={styles.group} onPress={() => this.toggleGroupStyle('pressedGroup1')} >
			         	<Text style={styles.groupName}> NYC Public Schools </Text>
			       	</TouchableOpacity>
		       	}
		       	{(this.state.pressedGroup2) ?
			        <LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.group} >
			        	<TouchableOpacity style={ styles.innerGroup } onPress={() => this.toggleGroupStyle('pressedGroup2')} >
						    <Text style={styles.groupName}> North HS Teachers </Text>
						</TouchableOpacity>
					</LinearGradient>
					:
					<TouchableOpacity style={styles.group} onPress={() => this.toggleGroupStyle('pressedGroup2')} >
			         	<Text style={styles.groupName}> North HS Teachers </Text>
			       	</TouchableOpacity>
		       	}
		       	{(this.state.pressedGroup3) ?
			        <LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.group} >
			        	<TouchableOpacity style={ styles.innerGroup } onPress={() => this.toggleGroupStyle('pressedGroup3')} >
						    <Text style={styles.groupName}> New York AP Math </Text>
						</TouchableOpacity>
					</LinearGradient>
					:
					<TouchableOpacity style={styles.group} onPress={() => this.toggleGroupStyle('pressedGroup3')} >
			         	<Text style={styles.groupName}> New York AP Math </Text>
			       	</TouchableOpacity>
		       	}
			       	
		       	</View>
		        <LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.button} >
		        	<TouchableOpacity style={ styles.innerButton } onPress={() => this.completed() } >
					    <Text style={{fontSize:20, textAlign:'center'}} > Share </Text>
					</TouchableOpacity>
				</LinearGradient>
		       	<TouchableOpacity style={styles.textLink} onPress={() => this.completed() } >
		         	<Text style={styles.private}> No thanks, I'll keep this one for myself </Text>
		       	</TouchableOpacity>
		       	<View style={styles.arrowContainer} >
    				<View style={styles.leftArrow} >
	    				<TouchableOpacity onPress={() => this.leftArrowClicked() }> 
	    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    				<View style={styles.rightArrow} >
	    				<TouchableOpacity>
	    					<FontAwesome name={'arrow-right'} size={ 50 } style={{color: 'white'}} /> 
	    				</TouchableOpacity>
    				</View>
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
	mainTitle: {
		width: '80%',
		height: '10%',
		marginTop: '10%',
		fontSize: 25,
		marginTop: 30,
		textAlign: 'center',	
	},
	title: {
		width: '80%',
		marginTop: '10%',
		marginBottom: 10,
		fontSize: 25,
		marginTop: 30,
		textAlign: 'center',	
	},
	arrowContainer: {
		flexDirection: 'row',
	},
	leftArrow: {
		marginTop: 94,
		marginRight: '25%',
	},
	rightArrow: {
		marginTop: 94,
		marginLeft: '25%',
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
		marginTop: 20,
		marginBottom: 20,
		shadowColor: 'gray', 
	},
	groups: {
		marginTop: 0,
		height: 100,
		width: '80%',
		justifyContent: 'space-between',
	    alignItems: 'center',
	    flexDirection: 'row',
	    marginBottom: 30,
	},
	innerGroup: {
		width: 76,
		height: 76,
	  	backgroundColor: 'white',
	    borderRadius: 10,
		justifyContent: 'center',
	}, 
	group: {
		width: 80,
		height: 80,
		shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	backgroundColor: 'white',
	  	borderWidth: 1,
	    borderRadius: 10,
		justifyContent: 'center',
	}, 
	groupName: {
		fontSize: 15,
		textAlign: 'center',
	},
	textLink: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	private: {
		fontSize: 12,
		textDecorationLine: 'underline',
		fontWeight: 'bold',
	},
})