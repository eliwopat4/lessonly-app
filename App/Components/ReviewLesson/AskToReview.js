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

export default class AskToReview extends Component {

	constructor(props) {
	    super(props);

	    this.state ={
	    	lesson: '',
	    	loading: true,
	    	reviews: [],
	    	reviewsShow: false,

	    }
  	}

  	reset = () => {
  		this.props.setComponent('DefaultCalendar')
  		this.props.navigate('Home')
  	}

  	async componentWillMount() {
		docs = await firestore.collection('lessons/'+this.props.lesson.lessonName+'/reviews').get();
		let reviews = [];
		docs.forEach((doc) => {
			//console.log(doc.data())
			reviews.push(doc.data())
		});	
		if(reviews !== undefined) {
			console.log('here')
			this.setState({ 
				lesson: this.props.lesson,
				reviews : reviews,
				reviewsShow: true,
				loading: false,
			});
		} else if(reviews.length !== 0) {
			console.log('here2')
			this.setState({ 
				lesson: this.props.lesson,
				reviews : reviews,
				reviewsShow: true,
				loading: false,
			});
		} else {
			console.log('here3')
			this.setState({ 
				lesson: this.props.lesson,
				reviews : reviews,
				loading: false,
			});
		}
	}

	getLessonReviews = async () => {
		let docs = await firestore.collection('lessons/'+this.props.lesson.lessonName+'/reviews').get();
		let reviews = [];
		docs.forEach((doc) => {
			//console.log(doc.data())
			reviews.push(doc.data())
		});	
		this.setState({ reviews : reviews });
		//return reviews;
	}

	returnLessonReviews = () => {
		this.getLessonReviews()
		//console.log(this.state.reviews)

		if(this.state.reviews === undefined) {
			return (<Text style={{marginBottom: 20}}> No reviews currently for this lesson. </Text>);
		} else if(this.state.reviews.length === 0) {
			return (<Text style={{marginBottom: 20}}> No reviews currently for this lesson. </Text>);
		} else {
			return this.state.reviews.map((review, index) => {
				return (
					<View key={index}>
						<View style={styles.starRating} >
							<StarRating
						        disabled={false}
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
				);
			});

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
	starRating: {
		flex: 1,
    	resizeMode: 'contain',
		width: '30%',
		height: '20%',
		// resizeMode: 'cover',
		// marginLeft: '10%',
		// borderWidth: 1,
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