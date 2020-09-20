import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { MaterialIcons } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
	const { state } = useContext(BlogContext);
	const blogPost = state.find((blog) => blog.id === navigation.getParam('id'));
	//console.log(navigation.getParam('id'));
	return (
		<View>
			<Text>{blogPost.title}</Text>
			<Text>{blogPost.content}</Text>
		</View>
	);
};

ShowScreen.navigationOptions = ({navigation}) => {
	return {
		headerRight : () => (
			<TouchableOpacity onPress={() => navigation.navigate('Edit',{ id: navigation.getParam('id') })}>
			<MaterialIcons name="edit" size={30} color="black" />
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({});

export default ShowScreen;
