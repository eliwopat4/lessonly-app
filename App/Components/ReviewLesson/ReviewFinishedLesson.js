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
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';

export default class ReviewFinishedLesson extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	like: '',
	    	wish: '',
	    	wonder: '',
	    	rating: 0,
	    	hasRated: false,
	    	isModalVisible: false,   
	    }
  	}

  	componentWillMount() {
  		this.setState({
  			like: this.props.like,
  			wish: this.props.wish,
  			wonder: this.props.wonder,
  			rating: this.props.rating,
  			hasRated: this.props.hasRated,
  		});
  	}

  	setInput = (state, txt) => {
  		this.setState({ [state] : txt });
  		this.props.setScreenState(state, txt)
  	}

  	onStarRatingPress = (rating) => {
  		if(this.state.hasRated === false) {
  			this.setState({hasRated:true});
  			this.props.setScreenState('hasRated', true)
  		}
  		this.setState({ rating : rating })
  		this.props.setScreenState('rating', rating)
  	}

  	clickedRightArrow = () => {
  		if(this.state.like.length === 0 || this.state.wish.length === 0 || this.state.wonder.length === 0 || this.state.hasRated === false) {
  			this.setState({ isModalVisible : true })
  		} else {
  			this.props.setComponent('YourReview')
  		}
  	}

  	toggleModal = () => {
    	if(this.state.isModalVisible) {
    		this.setState({ 
    			isModalVisible: false,
    		});
    	} else {
    		this.setState({ isModalVisible: true });
    	}
	}

	render() {
		return (
			<View style={styles.container}>
				<Modal
		          isVisible={this.state.isModalVisible}
		          animationInTiming={1500}
		          animationOutTiming={1500}
		          backdropTransitionInTiming={1500}
		          backdropTransitionOutTiming={1500}
		        >
		        	<View style={styles.modalContent} >
		        		<Text style={{fontSize: 20, textAlign: 'center'}}> Please completely fill out the review! </Text>
		      	 		<TouchableOpacity style={styles.button} onPress={() => this.toggleModal()}>
		  	     			<Text style={{fontSize:20}}> Close </Text> 
		  	     		</TouchableOpacity>
		        	</View>
		        </Modal>
	      		<Text style={styles.title}> <Text style={{fontWeight: 'bold'}}>The Derivative Game</Text> Review </Text>
				<Text style={styles.title}> Rating </Text>
		        <View style={styles.starRating} >
					<StarRating
				        disabled={false}
				        maxStars={5}
				        emptyStar={'ios-star-outline'}
				        fullStar={'ios-star'}
				        halfStar={'ios-star-half'}
				        iconSet={'Ionicons'}
				        rating={this.state.rating}
				        fullStarColor={'darkviolet'}
				        selectedStar={(rating) => this.onStarRatingPress(rating)}
				    />
			    </View>
		        <Text style={styles.title}>I Like ...</Text>
		        <TextInput
		            style={styles.input}
		            autoCapitalize = 'none'
		            value={this.state.like}
			      	multiline={true}
			      	onChangeText={(txt) => this.setInput('like', txt)} 
		    	/>
		        <Text style={styles.title}>I Wish ...</Text>
		        <TextInput
          			style={styles.input}
		            autoCapitalize = 'none'
		            value={this.state.wish}
			      	multiline={true}
			      	onChangeText={(txt) => this.setInput('wish', txt)} 
    			/>
		        <Text style={styles.title}>I Wonder ...</Text>
		        <TextInput
          			style={styles.input}
		            autoCapitalize = 'none'
		            value={this.state.wonder}
			      	multiline={true}
			      	onChangeText={(txt) => this.setInput('wonder', txt)} 
    			/>
				<View style={styles.arrowContainer} >
    				<View style={styles.leftArrow} >
	    				<TouchableOpacity onPress={() => this.props.setComponent('AskToReview')} >
	    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    				<View style={styles.rightArrow} >
	    				<TouchableOpacity onPress={() => this.clickedRightArrow()}>
	    					<FontAwesome name={'arrow-right'} size={ 50 } style={{color: 'black'}} /> 
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
		backgroundColor: 'white',
		alignItems: 'flex-start',
	},
	modalContent: {
	    backgroundColor: 'white',
	    padding: 22,
	    justifyContent: 'center',
	    alignItems: 'center',
	    borderRadius: 4,
	    borderColor: 'rgba(0, 0, 0, 0.1)',
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
	    marginTop: 20,
	},
	starRating: {
		width: '30%',
		marginLeft: '10%',
	},
	title: {
		width: '80%',
		marginLeft: '10%',
		marginTop: 20,
		fontSize: 25,
		textAlign: 'left',	
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
	arrowContainer: {
		width: '100%',
		justifyContent:'center',
		flexDirection: 'row',
	},
	leftArrow: {
		marginTop: 50,
		marginRight: '25%',
	},
	rightArrow: {
		marginTop: 50,
		marginLeft: '25%',
	},
})