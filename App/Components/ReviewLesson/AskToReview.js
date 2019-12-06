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
  	}

  	reset = () => {
  		this.props.setComponent('DefaultCalendar')
  		this.props.navigate('Home')
  	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title} >Would you like to <Text style={{fontWeight: 'bold'}}>review</Text> this lesson?</Text>
				<View style={styles.instructor}>
					<View style={styles.profilePicture}>
		            		<Image source={Images.Norbury} />
		            </View>
					<View style={styles.rating}>
							<Text style={styles.subtitle} ><Text style={{fontWeight: 'bold'}}>The Derivative Game</Text></Text>
		            		<Text style={{fontWeight: 'bold'}}> Ms. Norbury </Text>
		            		<Image source={Images.Rating} />
		            </View>
	            </View>
	            <View style={styles.scrollview}>
	      			<ScrollView > 
	      				<Text style={styles.bodyTitle}>Objective </Text>
	      				<Text style={styles.body}> Memorize derivative rules quickly.</Text>
	      				
	      				<Text style={styles.bodyTitle}>Materials </Text>
	      				<Text style={styles.body}> -Graph paper</Text>
	      				<Text style={styles.body}> -Ruler</Text>
	      				<Text style={styles.body}> -Crayons</Text>
	      				
	      				<Text style={styles.bodyTitle}>Instructions </Text>
	      				<Text style={styles.body}> 1. Students draw quadratics</Text>
	      				<Text style={styles.body}> 2. Watch students succeed</Text>
	      				<Text style={styles.body}> 3. Bask in the glory of success</Text>

	      				<Text style={{fontWeight: 'bold'}}>Media </Text>
	      				<View style = {styles.media}>
		      				<TouchableOpacity style={styles.icon}> 
								<FontAwesome name={'paperclip'} size={ 50 } style={{color: 'black'}} /> 
							</TouchableOpacity>
							<TouchableOpacity style={styles.video}>
	            				<Image source={Images.MeanGirls}/>
	            			</TouchableOpacity>
							<TouchableOpacity style={styles.icon}> 
								<FontAwesome name={'music'} size={ 50 } style={{color: 'black'}} /> 
							</TouchableOpacity>
	      				</View>
	      			</ScrollView>
      			</View>
				<LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.button} >
	        		<TouchableOpacity style={ styles.innerButton } onPress={() => this.props.setComponent('ReviewFinishedLesson') } >
				    	<Text style={{fontSize:20, textAlign:'center'}} > Yes! </Text>
					</TouchableOpacity>
				</LinearGradient>
				<TouchableOpacity style={styles.textLink} onPress={() => this.reset() } >
		         	<Text style={styles.no}> No thanks, I have no feedback </Text>
		       	</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
	},
	title: {
		width: '80%',
		marginTop: '5%',
		marginBottom: '5%',
		fontSize: 25,
		textAlign: 'left',	
	},
	subtitle: {
		width: '100%',
		fontSize: 20,
		textAlign: 'left',	
	},
	bodyTitle: {
		marginBottom: 20,
		fontWeight: 'bold'
	},
	body: {
		marginBottom: 20,
	},
	instructor: {
		flexDirection: 'row',
		width:'80%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginBottom: 15,
	},
	profilePicture: {
    	width: 70,
    	height: 70,
	},
	video: {
    	width: 70,
    	height: 70,
    	marginLeft: '17%',
    	marginRight: '17%',
    	justifyContent: 'center',
		alignItems: 'center',
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
	icon: {
		height: 62.5,
		width: 62.5,
		borderWidth:1,
		justifyContent: 'center',
		alignItems: 'center',
	  	shadowColor: 'gray', 
	    shadowOffset: { height: 2, width: 2 }, 
	    shadowOpacity: 2, 
	    shadowRadius: 2, 
	  	backgroundColor: 'white',
	},
	media: {
		flexDirection: 'row',
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
	textLink: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	no: {
		fontSize: 15,
		textDecorationLine: 'underline',
		fontWeight: 'bold',
	},
})