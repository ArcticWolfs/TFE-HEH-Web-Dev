import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AddUser } from './AddUser'
 
export class WebRoute extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/addUser" component={AddUser}></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default WebRoute