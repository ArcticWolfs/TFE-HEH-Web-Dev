import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './HomePage'
import { Inscription } from './Inscription'
 
export class WebRoute extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/inscription" component={Inscription}></Route>
                        <Route path="/" component={HomePage}></Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default WebRoute