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
import StarRating from 'react-native-star-rating';

const lessonsRef = firestore.collection('lessons');

export default class TodaysLesson extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	lesson: '',
	    	loading: true,
	    	reviews: [],
	    	reviewsShow: false,
	    }
	}


	async componentWillMount() {
		console.log('mounting...')
		let docs = await lessonsRef.get();
		let lessonsCopy = [];
		docs.forEach((doc) => {
			// console.log(doc.data())
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
		var index = Math.floor((Math.random() * array_length));
		this.props.setScreenState('lesson', lessonsCopy[index])
		// this.setState({lesson:lessonsCopy[index], loading: false})

		docs = await firestore.collection('lessons/'+this.props.lesson.lessonName+'/reviews').get();
		let reviews = [];
		docs.forEach((doc) => {
			//console.log(doc.data())
			reviews.push(doc.data())
		});	

		if(reviews !== undefined) {
			console.log('here')
			this.setState({ 
				lesson:lessonsCopy[index],
				reviews : reviews,
				reviewsShow: true,
				loading: false,
			});
		} else if(reviews.length !== 0) {
			console.log('here2')
			this.setState({ 
				lesson:lessonsCopy[index],
				reviews : reviews,
				reviewsShow: true,
				loading: false,
			});
		} else {
			console.log('here3')
			this.setState({ 
				lesson:lessonsCopy[index],
				reviews : reviews,
				loading: false,
			});
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
		      				{console.log(this.props.lesson.media.type)}
							{
							  	(this.props.lesson.media.type === 'none') ?
							  			<Text style={{marginBottom: 20}}> None </Text>
							  	:
							    (this.props.lesson.media.type === 'undefined') ?
							  		<Text style={{marginBottom: 20}}> None </Text>
							  	:
							    (this.props.lesson.media.type === 'image') ?
					    			<Image
								  		source={{uri: this.props.lesson.media.ref}}
								  		style={styles.mediaPicture}
									/>
						    	:
						    	(this.props.lesson.media.type === 'video') ?
						    		<View style={{alignItems: 'center'}}>
							    		<FontAwesome name={'play-circle'} size={ 75 } style={{color: 'black'}} />
						    		</View>
						    	:
		    					(this.props.lesson.media.type === 'music') ?
						    		<View style={{alignItems: 'center'}}>
							    		<FontAwesome name={'music'} size={ 75 } style={{color: 'black'}} />
						    		</View>
 								:
							    (this.props.lesson.media.type === 'document') ?
						    		<View style={{alignItems: 'center'}}>
							    		<FontAwesome name={'paperclip'} size={ 75 } style={{color: 'black'}} />
						    		</View>
						    	:
						    	null
							}

							<Text style={{fontWeight: 'bold'}}> Reviews </Text>
							{	
								this.state.reviewsShow ?
									this.state.reviews.map((review, index) => {
										return(
											<View key={index}>
												<View style={styles.starRating} >
													<StarRating
												        disabled={true}
												        maxStars={5}
												        emptyStar={'ios-star-outline'}
												        fullStar={'ios-star'}
												        halfStar={'ios-star-half'}
												        iconSet={'Ionicons'}
												        rating={review.rating}
												        fullStarColor={'darkviolet'}
												    />
											    </View>
											    <Text > I like: {review.like} </Text>
											    <Text > I wish: {review.wish} </Text>
											    <Text > I wonder: {review.wonder} </Text>
											    <Text style={{marginBottom: 20}}> By: {review.reviewer.firstName} {review.reviewer.lastName}</Text>
											</View>
										)
									})
								:
								<Text style={{marginBottom: 20}}> No reviews currently for this lesson. </Text>
							}

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
	starRating: {
		flex: 1,
    	resizeMode: 'contain',
		width: '30%',
		height: '20%',
		// resizeMode: 'cover',
		// marginLeft: '10%',
		// borderWidth: 1,
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