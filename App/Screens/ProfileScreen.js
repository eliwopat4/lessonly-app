import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Text,
	Image,
	TouchableOpacity,
	Button,
	FlatList,
	View,
	ActivityIndicator,
} from 'react-native';
import { Metrics, Colors, Images } from '../Themes';
import firebase from 'firebase';
import firestore from '../../firebase'
import Header from '../Components/Header';
import MySearchResults from '../Components/MySearchResults';
import ViewMyLesson from '../Components/ViewMyLesson';

const usersRef = firestore.collection('lessons');

export default class ProfileScreen extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	user: '',
	    	lessons: [],
	    	loading: true,
	    	viewLesson: false,
	    	lessonsEmpty: true,
	  	}
  	}

  	async componentDidMount() {
  		var user;
  		try {
			user = await firebase.auth().currentUser
		} catch(error) {
			console.log(error.message)
		}
  		var userRef = firestore.doc('users/'+user.email)
  		let doc = await userRef.get()
  		this.setState({ 
  			user: doc.data(),
  			lessons: doc.data().lessons,
  			loading: false,
  		});
  		if(this.state.lessons === undefined) {
  			this.setState({lessonsExist:false});
  		} else if(this.state.lessons === null) {
  			this.setState({lessonsExist:false});
  		} else if(this.state.lessons.length === 0) {
  			this.setState({lessonsExist:false});
  		}
  	}

	async logoutUser() {
		await firebase.auth().signOut();
		console.log('Logging out...');
		this.props.navigation.navigate('Loading');
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

	checkForLessons = () => {

	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header openDrawer = {this.props.navigation.toggleDrawer} navigate = {this.props.navigation.navigate} />
				<Image source={Images.Lorensax} style={styles.picture}/>
				<Text style={styles.title} > {this.state.user.firstName} {this.state.user.lastName} </Text>
				<Text style={styles.subtitle} > My Lessons </Text>
				{
					this.state.loading === true ?
					<View style={styles.FlatList}>
      					<ActivityIndicator size="large" color="#0000ff" />
      				</View>
      				: 
					(this.state.lessonsExist === false) ?
						<View style={styles.FlatList} >
							<Text style={styles.emptyLessons}> You currently have no lessons. </Text>
							<Text style={styles.emptyLessons}> Make your first lesson by clicking the button below or by clicking 'Create' in the menu! </Text>
							<Button onPress={() => this.props.navigation.navigate('Create')} title='Create Your First Lesson!!!' />
						</View>
						:
							this.state.viewLesson === false ?
							<View style={styles.FlatList} >
								<FlatList	
						          	data={this.state.lessons}
									numColumns={3}
						          	renderItem={({ item, index }) => (
						          		<MySearchResults lessonObject = {item} columnRow = {this.getColRow(index)} />
						          	)}
						          	keyExtractor={item => item.dateCreated} 
						        />
						    </View>
						    :
						    <ViewMyLesson {...this.state} />
				}		
				<TouchableOpacity onPress={() => this.logoutUser()} >
					<Text style={styles.subtitle2}> Logout </Text>
				</TouchableOpacity>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: '100%', 
		width: '100%',
		backgroundColor: 'white',
		alignItems: 'center',
	},
	picture: {
		marginTop: 30,
		marginBottom: 20,
		height: 100,
		width: 100,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	subtitle: {
		marginTop: 30,
		marginBottom: 30,
		fontSize: 20,
		fontWeight: 'bold',
	},
	subtitle2: {
		marginTop: 30,
		marginBottom: 30,
		fontSize: 20,
		fontWeight: 'bold',
		color: 'red'
	},
	emptyLessons: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		paddingLeft: 30,
		paddingRight: 30
	},
	FlatList: {
		height: '50%',
		width: '100%',
		alignItems: 'center',
	}
	
})