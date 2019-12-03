import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Button,
	View,
} from 'react-native';
import { Metrics, Colors, Images } from '../Themes';
import Header from '../Components/Header';
import CalendarPicker from 'react-native-calendar-picker';
import { FontAwesome } from '@expo/vector-icons';

export default class CalendarScreen extends React.Component {

	constructor(props) {
	    super(props);
  	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header openDrawer = {this.props.navigation.toggleDrawer} navigate = {this.props.navigation.navigate} />
				<Text style={styles.title} ><Text style={{fontWeight: 'bold'}}>Add</Text> this lesson to your course calendar</Text>
				<CalendarPicker
					style = {styles.calendar}
					selectedDayColor = {Colors.lg1}
					todayTextStyle = {{color: Colors.lg1}}
					todayBackgroundColor = {'transparent'}
				/>
				<View style={styles.arrowContainer} >
    				<View style={styles.leftArrow} >
	    				<TouchableOpacity > 
	    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    				<View style={styles.rightArrow} >
	    				<TouchableOpacity >
	    					<FontAwesome name={'arrow-right'} size={ 50 } style={{color: 'black'}} /> 
	    				</TouchableOpacity>
    				</View>
    			</View>
			</SafeAreaView>
			
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
		height: '10%',
		marginTop: '10%',
		fontSize: 25,
		marginTop: 50,
		marginBottom: 50,
		textAlign: 'left',	
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
})