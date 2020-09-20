import React, { useContext ,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
	const { state, addBlogPost, deleteBlogPost,getBlogPosts } = useContext(BlogContext);
	useEffect(() => {
		getBlogPosts();
		const listener = navigation.addListener('didFocus',() => {
			getBlogPosts();
		})
		return () => {
			listener.remove();
		}
	}, [])
	return (
		<View>
			{/* 	<Text>IndexScreen</Text>
			<Button title='Add Post' onPress={addBlogPost} /> */}
			<FlatList
				data={state}
				keyExtractor={(blogPost) => blogPost.id.toString()}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							style={{
								backgroundColor: '#' + Math.random().toString(16).substr(-6)
							}}
							onPress={() => navigation.navigate('Show', { id: item.id })}
						>
							<View style={styles.row}>
								<Text style={styles.title}>
									{item.title} - {item.id}
								</Text>
								<TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
									<Feather style={styles.icon} name='trash-2' color='black' />
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

IndexScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: () => (
			<TouchableOpacity onPress={() => navigation.navigate('Create')}>
				<Feather name='plus' size={30} />
			</TouchableOpacity>
		)
	};
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 15,
		borderTopWidth: 1,
		borderBottomWidth: 2,
		borderColor: 'white'
	},
	title: {
		fontSize: 20,
		color: 'white',
		fontWeight: '600'
	},
	icon: {
		fontSize: 25
	}
});

export default IndexScreen;
