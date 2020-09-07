import React, { Component } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        //submitted: false
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
        };
        // Just need to pass the obj as second parameter, axio turns it to JSON
        // axios.post('https://jsonplaceholder.typicode.com/posts', data)
        //     .then(response => {
        //         console.log(response);
        //     });

        axiosInstance.post('/posts', data)
        .then(response => {
            console.log(response);
            // Redirects to this route. Replace replaces the current route by that one.
            // 'push' can also be used, this one will add the next page to the stack,
            // so if user clicks on browser's back button, it'd bring back to this page.
            this.props.history.replace('/posts');
            //this.setState({ submitted: true });
        });
    }

    render () {
        // Example of conditional rendering
        // let redirect = null;
        
        // if(this.state.submitted) {
        //     // Redirect out of <Switch> can't use 'from' property
        //     redirect = <Redirect to="/posts" />
        // }

        return (
            <div className="NewPost">
                {/* {redirect} */}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;