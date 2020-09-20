import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';

const BlogPostForm = ({onSubmit,initialTitle,initialContent}) => {
	const [ title, setTitle ] = useState(initialTitle);
	const [ content, setContent ] = useState(initialContent);
	return (
		<View>
			<Text style={styles.label}>Enter Title : </Text>
			<TextInput placeholder='title' style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
			<Text style={styles.label}>Enter Content : </Text>
			<TextInput
				placeholder='content'
				style={styles.input}
				value={content}
				onChangeText={(text) => setContent(text)}
			/>
			<Button
				style={styles.btn}
				title='Save Post'
				onPress={() => onSubmit(title,content)}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	label: {
		marginTop: 10,
		marginLeft: 10,
		fontSize: 20,
		color: 'blue',
		fontWeight: 'bold'
	},
	input: {
		margin: 10,
		marginBottom: 20,
		borderWidth: 2,
		borderColor: 'black',
		padding: 5,
		fontSize: 18
	}
});

export default BlogPostForm;
