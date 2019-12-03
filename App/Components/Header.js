import React, { Component } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	Image,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { Images, Metrics } from '../Themes';
import { FontAwesome } from '@expo/vector-icons';

export default class Header extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.menu} onPress={() => this.props.openDrawer()} >
	  				<FontAwesome name={'bars'} size={ 40 } style={{color: 'black'}} />
	  			</TouchableOpacity>
				<TouchableOpacity style={styles.bulb} onPress={() => this.props.navigate('Home')} >
	  				<Image style={styles.pic} source={Images.LessonlyPurpleBulb2}  />
	  			</TouchableOpacity>
	  		</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',	
		flexDirection: 'row',
	},
	menu: {
		marginLeft: 20,
	},
	bulb: {
		marginLeft: (Metrics.screenWidth/2) - (60 + 17.5),
	},
	pic: {
		width: 35,
	}
});



