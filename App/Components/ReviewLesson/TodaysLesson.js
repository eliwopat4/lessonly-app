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

export default class TodaysLesson extends Component {

	constructor(props) {
	    super(props);
  	}


	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title} >Today's Lesson</Text>
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
	      				<Text style={{fontWeight: 'bold'}}>Objective </Text>
	      				<Text style={{marginBottom: 20}}> Memorize derivative rules quickly.</Text>
	      				
	      				<Text style={{fontWeight: 'bold'}}>Materials </Text>
	      				<Text style={{marginBottom: 20}}> -Graph paper</Text>
	      				<Text style={{marginBottom: 20}}> -Ruler</Text>
	      				<Text style={{marginBottom: 20}}> -Crayons</Text>
	      				
	      				<Text style={{fontWeight: 'bold'}}>Instructions </Text>
	      				<Text style={{marginBottom: 20}}> 1. Students draw quadratics</Text>
	      				<Text style={{marginBottom: 20}}> 2. Watch students succeed</Text>
	      				<Text style={{marginBottom: 20}}> 3. Bask in the glory of success</Text>

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
		marginBottom: 25,
		fontSize: 30,
		textAlign: 'left',	
	},
	subtitle: {
		width: '100%',
		fontSize: 20,
		textAlign: 'left',	
	},
	instructor: {
		flexDirection: 'row',
		width:'80%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginBottom: 25,
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