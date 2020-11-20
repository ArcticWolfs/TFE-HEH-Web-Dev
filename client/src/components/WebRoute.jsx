import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomePage } from './HomePage'
import { AccountPage } from './AccountPage'
import Connexion from './Connexion';
import Inscription from './Inscription'
 
export class WebRoute extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            connect: true,
            inscript: false,
            id:0
        }
    }

    render() {
        if (this.state.connect===true && this.state.id<1){
            return (
                <div>
                    <Connexion connect={this.setConnectState} toInscript={this.setToInscriptState}/>
                </div>
            )
        }
        else if (this.state.inscript===true && this.state.id<1){
            return (
                <div>
                    <Inscription toConnect={this.setToConnectState}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Router>
                        <Switch>
                            <Route path='/monCompte' render={() => (<AccountPage/>)}></Route>
                            <Route path='/' render={() => (<HomePage/>)}></Route>
                        </Switch>
                    </Router>
                </div>
            )
        }
    }

    setConnectState = (idUser) => {
        this.setState({
            connect:false,
            inscript:false,
            id:idUser
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