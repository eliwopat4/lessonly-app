import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Text,
	Image,
	View,
	TextInput,
	TouchableOpacity,
	Platform,
	FlatList,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { Metrics, Colors, Images } from '../../Themes';
import { SearchBar } from 'react-native-elements'
import SearchResults from './SearchResults';
import firebase from 'firebase';
import firestore from '../../../firebase'

const usersRef = firestore.collection('lessons');

export default class SearchLessons extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	search: '',
	    	lessons: [],
	    	data: [],
	  	}
  	}

  	componentWillMount = () => {
  		//this.setState({ search: this.props.search })
  		this.getLessons()
  	}

  	updateSearch = (txt) => {
  		if(txt === '') {
    		this.props.handleAction('search', txt, 'DefaultSearch')
    		this.setState({ search: txt })
    	} else {
    		var newData = []
			this.state.lessons.forEach((lesson) => {
				if(lesson.lessonName.toLowerCase().includes(txt.toLowerCase())) {
					// console.log(lesson.lessonName+ '________' +txt)
					// console.log(lesson.lessonName.toLowerCase().includes(txt.toLowerCase()))
					newData.push(lesson)
				}
			});
	    	this.setState({
	    		search: txt,
	    		data: newData,
	    	});
    	}
		
  	}

  	getLessons = async() => {
		let docs = await usersRef.get();
		let lessonsCopy = [];
		docs.forEach((doc) => {
			// console.log(doc.data())
			lessonsCopy.push(doc.data())
		});	
		this.setState({ lessons: lessonsCopy})
		this.setState({ data: lessonsCopy})
		this.updateSearch(this.props.search)
	}

	getColRow = (index) => {
		var col;
		var row;
		if(index % 3 === 0) {
			col = 0;
		} else if(index % 3 === 1) {
			col = 1;
		} else {
			col = 2;
		}
		if(index === 0){
			row = 0;
		} else {
			row = Math.floor(index/3) % 3;
		}
		return {row, col};
	}


	render() {
		return (
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
				<View style={styles.flatListcontainer}>
	      			<Text style={styles.title} > Lessonly </Text>
	      			<SearchBar
						round
						containerStyle={styles.input}
						platform={(Platform.OS === 'ios') ? "ios" : "android"}
						searchIcon={
							{ size: Metrics.small },
							{ color: 'red' }
						}
						value={this.state.search}
			            onChangeText={text => this.updateSearch(text)} 
						placeholder='Find a lesson'
			            autoCapitalize = 'none'
					/>
					{(this.state.search == '') ? 
					<View style={styles.boxContainer}>
						<View style={styles.column1} >  
							<TouchableOpacity style={styles.box1} onPress={() => Keyboard.dismiss()}>
								<Text style={styles.boxText}> Top Picks for you </Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.box2} onPress={() => Keyboard.dismiss()}>
								<Text style={styles.boxText} > Your Favorites </Text>
							</TouchableOpacity>
						</View>
						<View style={styles.column2} >
							<TouchableOpacity style={styles.box3} onPress={() => Keyboard.dismiss()}>
								<Text style={styles.boxText} > Trending in AP Mathematics </Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.box4} onPress={() => Keyboard.dismiss()}>
								<Text style={styles.boxText} > Top Decimal Lessons </Text>
							</TouchableOpacity>
						</View>
					</View>
					:
						<FlatList	
				          	data={this.state.data}
							numColumns={3}
				          	renderItem={({ item, index }) => (
				          		<SearchResults lessonObject = {item} columnRow = {this.getColRow(index)} handleAction = {this.props.handleAction}/>
				          	)}
				          	keyExtractor={item => item.dateCreated} 
				        />
					}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: 'white',
		alignItems: 'center',
	},
	flatListcontainer: {
		height: '80%',
		width: '100%',
		backgroundColor: 'white',
		alignItems: 'center',
		marginBottom: 50,	
	},
	title: {
		marginTop: 20,
		fontSize: 30,
		fontWeight: 'bold',
	},
	input: {
		marginTop: 40,
		backgroundColor: 'white',
		marginBottom: 20,
	},
	boxContainer: {
		width: '80%',
		height: '50%',
		flexDirection: 'row',
		justifyContent: 'space-around'
	}, 
	box1: {
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		height: 170,
		width: 150,
		borderRadius: 10,
		backgroundColor: 'royalblue',
	},
	box2: {
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		height: 170,
		width: 150,
		borderRadius: 10,
		backgroundColor: 'fuchsia',
	},
	box3: {
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		height: 250,
		width: 150,
		borderRadius: 10,
		backgroundColor: 'darkviolet',
	},
	box4: {
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
		width: 150,
		borderRadius: 10,
		backgroundColor: 'dodgerblue',
	},
	column1: {
		justifyContent: 'space-around',
	},
	column2: {
		justifyContent: 'space-around',
	},
	boxText: {
		textAlign: 'center', 
		fontWeight: 'bold',
		color: 'white',
		padding: 10,
	},

})



