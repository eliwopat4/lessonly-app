import React from 'react';
import {
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Metrics, Colors, Images } from '../Themes';

export default class LoadingScreen extends React.Component {

	render() {
		return (
			<LinearGradient colors={[Colors.lg1, Colors.lg2, Colors.lg3]} style={styles.container}>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
      				<Image source={Images.LessonlyWhiteBulb} style={styles.lessonlyBulb} />
					<Image source={Images.LessonlyText} style={styles.lessonlyText} />      		
				</TouchableOpacity>
      		</LinearGradient>	
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	lessonlyText: {
		resizeMode: 'stretch',
		width: 120,
	},
	lessonlyBulb: {
  		marginLeft: '2%',
  	},
})