import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer'

const blogReducer = (state, action) => {
	switch (action.type) {
		case 'get_blogposts':
			return action.payload;
		case 'add_blogpost':
			return [
				...state,
				{
					id: Math.floor(Math.random() * 9999 * (state.length + 1)),
					title: action.payload.title,
					content: action.payload.content
				}
			];
		case 'delete_blogpost':
			return state.filter((blogpost) => blogpost.id !== action.payload);
		case 'edit_blogpost':
			return state.map((blogPost) => {
				return blogPost.id === action.payload.id ? action.payload : blogPost
			});
		default:
			return state;
	}
};

const getBlogPosts = (dispatch) => {
	return async () => {
	   const response = await jsonServer.get('/blogposts');
	   dispatch({type:'get_blogposts',payload:response.data})
	}
}

const addBlogPost = (dispatch) => {
	return async(blogPost,callback) => {
		await jsonServer.post('/blogposts',{title:blogPost.title,content:blogPost.content})
		/* dispatch({ type: 'add_blogpost', payload: blogPost }); */
		callback();
	};
};

const deleteBlogPost = (dispatch) => {
	return async(id) => {
		await jsonServer.delete(`/blogposts/${id}`)
		dispatch({ type: 'delete_blogpost', payload: id });
	};
};

const editBlogPost = (dispatch) => {
	return async(newBlogPost,callback) => {
		await jsonServer.put(`/blogposts/${newBlogPost.id}`,{title:newBlogPost.title,content:newBlogPost.content})
		dispatch({ type: 'edit_blogpost', payload: newBlogPost });
		callback();
	};
};

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deleteBlogPost,editBlogPost,getBlogPosts }, []);
