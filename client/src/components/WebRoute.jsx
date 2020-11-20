import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './HomePage'
 
export class WebRoute extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/" component={HomePage}></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default WebRoute