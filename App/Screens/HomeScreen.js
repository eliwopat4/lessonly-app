import React from 'react';
import {
	StyleSheet,
	SafeAreaView,
	Text,
	TouchableOpacity,
	Image,
	Platform,
	View,
	Button,
} from 'react-native';
import { Metrics, Colors, Images } from '../Themes';
import { SearchBar } from 'react-native-elements'
import Header from '../Components/Header';

export default class HomeScreen extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
	    	search: '',
	  	}
  	}

	menuAction = (action) => {
  		if (action.localeCompare('OpenDrawer') === 0) {
  			this.props.navigation.toggleDrawer();
  		} else {
  			this.props.navigation.navigate(action)
  		}
  	}

  	updateSearch = (txt) => {
  		this.setState({ search: txt });
  	}

  	printMethod = () => {
  		console.log(this.props.navigation.state);
  	}
	componentDidMount() {
  		var screen = this.props.navigation.getParam('screenA', 'null');
  		this.props.navigation.setParams({ 
  			screenA: this.props.navigation.state.routeName,
  			screenB: screen,
  		});
  	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Header navigate = {this.menuAction} />
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
				<View style={styles.boxContainer}>
					<View style={styles.column1} >
						<TouchableOpacity style={styles.box1}>
							<Text style={styles.boxText}> Top Picks for you </Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.box2}>
							<Text style={styles.boxText} > Your Favorites </Text>
						</TouchableOpacity>
					</View>
					<View style={styles.column2} >
						<TouchableOpacity style={styles.box3}>
							<Text style={styles.boxText} > Trending in AP Mathematics </Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.box4}>
							<Text style={styles.boxText} > Top Decimal Lessons </Text>
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
	}
})