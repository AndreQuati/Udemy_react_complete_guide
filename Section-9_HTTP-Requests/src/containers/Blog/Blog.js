import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null 
    }

    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // .data is the attribute from the json returned by the API that contains
                // the array of posts
                // Trimming the array to get only 4 posts 
                const posts = response.data.slice(0,4);
                // Creating a new post obj addin 'Author' attribute to the post
                const updatedPosts = posts.map(post => {
                    // For each post in Posts, creates a new object using the spread operator  
                    // and adds the attribute 'author'
                    return {
                        ...post,
                        author: 'Max'
                    };
                });
                this.setState({posts: updatedPosts});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                // clicked={() => this.postSelectedHandler(post.id)} />
                clicked={() => this.postSelectedHandler(post.id)} />
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;