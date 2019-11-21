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
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { Metrics, Colors, Images } from '../Themes';
import Header from '../Components/Header';
import firebase from 'firebase';
import firestore from '../../firebase'


export default class LessonDoc extends Component {

  state = {
    text: '',
  }

	onChangeText = txt => {
    this.setState({text: txt})
  }

  searchAPI = () => {
    this.props.searchAPI(this.state.text)
    this.setState({text: ''})
  }

  render () {
    return (
      <View style={styles.container} > 
         <TextInput
          style={{width: '80%', padding: 10}}
          onChangeText={(txt) => this.onChangeText(txt)} 
          value={this.state.text} 
          placeholder={'Search for News'}
        />
        <TouchableOpacity onPress={() => this.searchAPI()}> 
          <FontAwesome name={'search'} size={ 15 } style={{color: 'orange'}}/> 
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
    height: 40,
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
	},
});
