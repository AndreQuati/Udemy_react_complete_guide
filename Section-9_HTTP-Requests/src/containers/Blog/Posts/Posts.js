import React, { Component } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Route, Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';


class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axiosInstance.get('/posts')
            .then(response => {
                // .data is the attribute from the json returned by the API that contains
                // the array of posts
                // Trimming the array to get only 4 posts 
                const posts = response.data.slice(0, 4);
                // Creating a new post obj addin 'Author' attribute to the post
                const updatedPosts = posts.map(post => {
                    // For each post in Posts, creates a new object using the spread operator  
                    // and adds the attribute 'author'
                    return {
                        ...post,
                        author: 'Max'
                    };
                });
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log(error);
                //this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>

        // Renders if there's no error
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // Link allows passing parameters through url to router
                    // The 'key' property was moved from Post to Link since it always should be
                    // in the outmost element 
                    <Link to={'/posts/' + post.id} key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            // clicked={() => this.postSelectedHandler(post.id)} />
                            clicked={() => this.postSelectedHandler(post.id)} />
                    </Link>
                )
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* Route component can be used at any child that is wrapped by BrowserRouter,
                in this case, it's in App.js */}
                {/* the path for nested routes must be all the path before it + the next path.
                this prop...url loads the previous paths dinamically. */}
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;