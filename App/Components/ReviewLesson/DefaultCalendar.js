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
import { Metrics, Colors, Images } from '../../Themes';
import CalendarPicker from 'react-native-calendar-picker';
import { FontAwesome } from '@expo/vector-icons';

export default class DefaultCalendar extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	datePicked: '',
	    }
  	}

  	onDateChange = (date) => {
  		var res = (date.toString()).split(" ");
		// var parsedDate = res[0] + ' ' + res[1] + ' ' + res[2] + ' ' + res[3]
		this.setState({ datePicked: res[2]});
		this.props.setScreenState('datePicked', res[2])
		// console.log(parsedDate)
  		this.props.setComponent('TodaysLesson')
  	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title} >Check your<Text style={{fontWeight: 'bold'}}> lesson calendar</Text></Text>
				<CalendarPicker
					style = {styles.calendar}
					selectedDayColor = {Colors.lg1}
					todayTextStyle = {{color: Colors.lg1}}
					todayBackgroundColor = {'transparent'}
					onDateChange={this.onDateChange}
				/>
				<View style={styles.arrowContainer} >
    				<View style={styles.leftArrow} >
	    				<TouchableOpacity > 
	    					<FontAwesome name={'arrow-left'} size={ 50 } style={{color: 'white'}} /> 
	    				</TouchableOpacity>
    				</View>
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