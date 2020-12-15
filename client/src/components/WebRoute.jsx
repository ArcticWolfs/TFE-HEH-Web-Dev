import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './HomePage'
import { AccountPage } from './AccountPage'
import {InterroList} from "./InterroList";
import { Connexion } from './Connexion';
import { Inscription } from './Inscription'

 
export class WebRoute extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            connect: true,
            inscript: false,
            id:sessionStorage.getItem('userID') || localStorage.getItem('userID') || 0
        }
        console.log(this.state.id)
    }

    render() {
        if (this.state.connect===true && this.state.id<1){
            return (
                <React.Fragment>
                    <Connexion connect={this.setConnectState} toInscript={this.setToInscriptState}/>
                </React.Fragment>
            )
        }
        else if (this.state.inscript===true && this.state.id<1){
            return (
                <React.Fragment>
                    <Inscription toConnect={this.setToConnectState}/>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path='/monCompte' render={() => (<AccountPage userId={this.state.id}/>)}></Route>
                        <Route path='/interroList' render={() => (<InterroList/>)}></Route>
                        <Route path='/' render={() => (<HomePage/>)}></Route>
                    </Switch>
                </Router>
            </React.Fragment>
        )
    }

    setConnectState = () => {
        this.setState({
            connect:false,
            inscript:false
        })
    }

    setToInscriptState = () => {
        this.setState({
            connect:false,
            inscript:true
        })
    }

    setToConnectState = () => {
        this.setState({
            connect:true,
            inscript:false
        })
    }
}

export default WebRoute
