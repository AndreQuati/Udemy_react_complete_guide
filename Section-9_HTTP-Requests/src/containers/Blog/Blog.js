import React, { Component } from 'react';
import axiosInstance from '../../axiosInstance';

import './Blog.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {
    state = {
        // Example of 'guard' - routing only if autheticated
        auth: true
    }

    render() {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* With this routing, it's necessary to use the Link component
                                instead of href to avoid refreshing the whole page when redirecting
                                to that route. Link manages that URL properly
                                <NavLink> is similar to <Link> but allows applying styling */}
                            <li><NavLink to="/posts" exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                // It's possible to add more parameters as:
                                pathname: '/new-post',
                                // hash: '#submit', // # anchor to link to a speific point in the page  
                                // search: '?quick-submit=true' //search parameters 
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* - The 'exact' property defines that this content will only be rendered if 
                    the is exatcly as defined. If exact is not set, anything that starts
                    with that path will render this content.
                    - <Route path="/" exact render={() => <h1>Home</h1>}/>
                    <Route path="/" render={() => <h1>Home 2</h1>}/> */}

                 {/*Switch guarantees that only one route will be loaded, the first one
                    matching the URL. */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null}
                    
                    {/* This path contains a nested route. When this happens, the parent
                    route cannot have the 'exact' property */}
                    <Route path="/posts" component={Posts} />
                    {/* This is a flexible route, since the id parameter can vary,
                    so this needs to come to the end, otherwise other routes as "new-post"
                    won't load. */}
                    {/* <Route path="/:id" exact component={FullPost} /> */}
                    {/* Route without path will direct all unknow route to the specified
                    component or render. This DOESN'T WORK WITH <REDIRECT with PATH="/"> */}
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;