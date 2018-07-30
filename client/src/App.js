import React, {Component} from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Account from './components/pages/Account';
import SinglePost from './components/pages/SinglePost';
import Author from './components/pages/Author';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from "./components/pages/NotFound";
import jwt from 'jsonwebtoken';
import {connect} from 'react-redux';
import * as actions from './actions/authAction'
import * as axios from "axios";


class App extends Component {
    componentWillMount(){
        try{
            // before comp render, ask for token from ls
            const token = localStorage.getItem('token');
            // get info from token
            if(!token) return;
            // if token used write to headers axios lib
            axios.defaults.headers.common['Authorization']= token;
            const user = jwt.decode(token.split(' ')[1]);
            console.log(user);
            this.props.setUser(user);
            // update state-> auth reducer
        }catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/account' component={Account}/>
                        <Route path='/post/:title' component={SinglePost}/>
                        <Route path='/author/:id' component={Author}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions) (App);
