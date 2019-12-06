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

  	getUsername() {
  		var res = (this.props.lessonObject.author).split("@");
  		return (
  			<Text style={styles.authorRating}> {res[0]} </Text>
  		);
  	}

	render() {
		return (	
			<TouchableWithoutFeedback>	
				<View>		
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
					<Text> {this.props.lessonObject.firstName} {this.props.lessonObject.lastName} </Text>
					{this.getUsername()}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		alignItems: 'center',
	},
	group: {
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
		textAlign: 'center',
		justifyContent: 'center',
	}
})