import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import BlogPostForm from '../context/BlogPostForm'

const CreateScreen = ({ navigation }) => {
	const { state,editBlogPost } = useContext(BlogContext);
    const blogPost = state.find((blog) => blog.id === navigation.getParam('id')); 
    const id = navigation.getParam('id');
    const onSubmit = (title,content) => {
        editBlogPost({id,title,content},() => {
            navigation.pop()
        });
    }
	return (
		    <BlogPostForm onSubmit={onSubmit} initialTitle={blogPost.title} initialContent={blogPost.content} />
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

export default CreateScreen;
