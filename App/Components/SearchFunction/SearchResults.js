import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

const colors = [['royalblue', 'fuchsia', 'darkviolet'], ['darkviolet', 'royalblue', 'fuchsia'], ['fuchsia', 'darkviolet', 'royalblue']];

export default class SearchResults extends Component {

	constructor(props) {
	    super(props);

  	}

  	clickedLesson = () => {
  		this.props.handleAction('lesson', this.props.lessonObject, 'LessonOverview')
  	}

	render() {
		return (	
				<View style={{alignItems: 'center'}}>		
					<TouchableOpacity 
						style={{
							width: 100,
							height: 100,
							shadowColor: 'gray', 
						    shadowOffset: { height: 3, width: 3 }, 
						    shadowOpacity: 3, 
						    shadowRadius: 3, 
						  	borderWidth: 1,
						    borderRadius: 10,
						    borderWidth: 2,
							justifyContent: 'center',
							marginTop: 50,
							marginLeft: 15,
							marginRight: 15,
							backgroundColor: colors[this.props.columnRow.row][this.props.columnRow.col]
						}} 
						onPress={() => this.clickedLesson()} >
						    <Text style={styles.groupName}> {this.props.lessonObject.lessonName} </Text>
					</TouchableOpacity>
					<Text style={styles.authorRating}> {this.props.lessonObject.author.firstName} {this.props.lessonObject.author.lastName} </Text>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		alignItems: 'center',
		// borderWidth: 1,
	},
	groupName: {
		fontSize: 15,
		textAlign: 'center',
		fontWeight: 'bold',
		justifyContent: 'center',
		color: 'white'
	},
	authorRating: {
		marginTop:10,
		fontSize: 15,
		width: 100,
		textAlign: 'center',
		justifyContent: 'center',
		// borderWidth: 1,
	}
})