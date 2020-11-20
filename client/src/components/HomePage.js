import React, { Component } from 'react'
import "../css/style.css";
import Connexion from './Connexion';
import Inscription from './Inscription'

export class HomePage extends Component {

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
                    
                    <h1>Bienvenue</h1>
                </div>
            )
        }
        else if (this.state.inscript===true && this.state.id<1){
            return (
                <div>
                    <Inscription toConnect={this.setToConnectState}/>
                    
                    <h1>Bienvenue</h1>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>Bienvenue</h1>
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
export default HomePage