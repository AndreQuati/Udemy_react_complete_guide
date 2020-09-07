import React, { Component } from 'react';
import axiosInstance from '../../../axiosInstance';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidMount () {
        this.loadData();
    }

    componentDidUpdate () {
        this.loadData();
    }

    loadData = () => {
        // Checking if id is not null before sending the request
        // match.params - to access props sent throug url (routing)
        if(this.props.match.params.id) {
            // componentDidUpdate is called every time the component is rendered, and since the
            // state is being updated inside it, it will trigger the component to udpate every time
            // this method is called, creating an infinit loop. 
                // To avoid this issue, checking if this received post id is = this loadedPost id
                // or if loadedPost = null, which means it hasn't been rendered yet
                if(!this.state.loadedPost || this.props.match.params.id !== +this.state.loadedPost.id) {
                    axiosInstance.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        console.log(response.data);
                        this.setState({loadedPost: response.data});
                    });
                }
            }
    }

    deletePostHandler = () => {
        axiosInstance.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
        
        // ComponentDidUpdate is not called for the inital render and the API call is getting
        // data asynchronously, so this component may try to render post while it's still null
        // First, checking if the post id is null, if not it means there's a valid post,
        // but it might not be retrieved from the API yet
        if(this.props.match.params.id) {
            post = <p style={{textAlign: "center"}}>Loading...</p>
        }
        // Second, checking if the full post's been loaded before rendering
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;