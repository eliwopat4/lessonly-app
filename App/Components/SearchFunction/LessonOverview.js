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
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import firebase from 'firebase';
import firestore from '../../../firebase';
import StarRating from 'react-native-star-rating';

const lessonsRef = firestore.collection('lessons');


export default class LessonReview extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	isModalVisible: false,
	    	error: false,
	    	errorMessage: '',
	    	lessonName: '',
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
		// this.props.setScreenState('lesson', lessonsCopy[index])
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

  	leftArrowClicked = () => {
  		this.props.handleAction('cleanUp');
  	}

  	rightArrowClicked = () => {
  		this.props.handleAction('lessonName', this.state.text, 'LessonShare');
  	}


    updateLessonName = (txt) => {
    	this.setState({ lessonName: txt})
    }

    toggleModal = () => {
    	if(this.state.isModalVisible) {
    		this.setState({ 
    			isModalVisible: false,
    			error: false,
    		});
    	} else {
    		this.setState({ isModalVisible: true });
    	}
	}




	goToCalendar = () => {
		this.props.handleAction('search', '', 'Calendar')
		this.toggleModal()
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={() => this.toggleModal} >
					<Modal
			          	isVisible={this.state.isModalVisible}
			          	animationInTiming={1500}
			          	animationOutTiming={1500}
			          	backdropTransitionInTiming={1500}
			          	backdropTransitionOutTiming={1500}
			        >
			        	<View style={styles.modalContent} >
			        		<View style={{flexDirection: 'row-reverse', width: 300}}>
								<TouchableOpacity onPress={() => this.toggleModal()}>
									<FontAwesome name={'times-circle'} size={ 30 } style={{color: 'red'}} /> 
								</TouchableOpacity>
							</View>
			        		<View style={styles.mediaIcons}>
			    				<View style={styles.iconRow}>
					    			<TouchableOpacity style={styles.icon} onPress={() => this.toggleModal()}> 
										<FontAwesome name={'save'} size={ 50 } style={{color: 'black'}} /> 
										<Text style={{fontSize: 15}}> Save </Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.icon} onPress={() => this.toggleModal()}> 
										<FontAwesome name={'share-square'} size={ 50 }  /> 
										<Text style={{fontSize: 15}}> Share </Text>
									</TouchableOpacity>
								</View>
								<View style={styles.iconRow}>
									<TouchableOpacity style={styles.icon} onPress={() => this.goToCalendar()}> 
										<FontAwesome name={'calendar'} size={ 50 } style={{color: 'black'}} /> 
										<Text style={{fontSize: 15}}> Add </Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.icon} onPress={() => this.toggleModal()}> 
										<FontAwesome name={'edit'} size={ 50 } style={{color: 'black'}} /> 
										<Text style={{fontSize: 15}}> Edit </Text>
									</TouchableOpacity>
								</View>
							</View>
			        	</View>
			        </Modal>
			    </TouchableWithoutFeedback>
				<View style={styles.container} >
	      			<Text style={styles.title} > Lesson: <Text style={{fontWeight: 'bold'}} >{this.props.lesson.lessonName}</Text> </Text>
	      			<Text style={styles.author} > Created by: <Text style={{fontWeight: 'bold'}} >{this.props.lesson.author.firstName} {this.props.lesson.author.lastName} </Text> </Text>
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
	    			<View style={styles.arrowContainer} >
	    				<View style={styles.leftArrow} >
		    				<TouchableOpacity onPress={() => this.leftArrowClicked() }> 
		    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
		    				</TouchableOpacity>
	    				</View>
	    				<View style={styles.rightArrow} >
		    				<TouchableOpacity onPress={() => this.toggleModal()} >
		    					<FontAwesome name={'plus-circle'} size={ 50 } color='purple' /> 
		    				</TouchableOpacity>
	    				</View>
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
		marginTop: 50,
		textAlign: 'center',	
	},
	author: {
		width: '80%',
		height: '10%',
		marginTop: 10,
		fontSize: 25,
		textAlign: 'center',	
	},
	scrollview: {
		width: '80%', 
		height: '45%',
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
	},
	arrowContainer: {
		flexDirection: 'row',
	},
	leftArrow: {
		marginTop: 10,
		marginRight: '25%',
	},
	rightArrow: {
		marginTop: 10,
		marginLeft: '25%',
	},
  	button: {
	    shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
	  	backgroundColor: 'white',
	    height: 40,
	    width: 180,
	    borderRadius: 50,
	    marginBottom: 20,
	    justifyContent: 'center',
	    alignItems: 'center',
	    flexDirection: 'row',
	},
	modalContent: {
	    backgroundColor: 'white',
	    padding: 22,
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderRadius: 4,
	    borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	lessonName: {
		width: '80%', 
		padding: 10, 
		marginTop: 20,
		backgroundColor: 'white',
		marginBottom: 20,
	  	borderRadius: 10,
	  	shadowColor: 'gray', 
	    shadowOffset: { height: 3, width: 3 }, 
	    shadowOpacity: 3, 
	    shadowRadius: 3, 
	  	borderWidth: 1,
	  	backgroundColor: 'white',
	},
	mediaPicture: {
		width: 200, 
		height: 200,
		resizeMode: 'contain', 
		alignItems: 'center',
	},
	removeText: {
		fontWeight:'bold', 
		fontSize:15, 
		color:'red', 
		textAlign:'center',
	},
	mediaIcons: {
		width: 370, 
		height: 400,
		padding: 10, 
	  	flexDirection: 'row',
	  	marginBottom: 12,
	  	marginTop: 15,
		justifyContent: 'space-around',
	},
	iconRow: {
		justifyContent: 'space-around',
	},
	icon: {
		height: 125,
		width: 125,
		borderWidth:1,
		justifyContent: 'center',
		alignItems: 'center',
	  	shadowColor: 'gray', 
	    shadowOffset: { height: 2, width: 2 }, 
	    shadowOpacity: 2, 
	    shadowRadius: 2, 
	  	backgroundColor: 'white',
	},

})







