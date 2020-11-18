import React, { Component } from 'react'
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from 'axios'
import Modal from "react-modal";

Modal.setAppElement("#root");

export class Connexion extends Component {

    constructor(props) {
        super(props)

        this.state = {
            emailAddress: null,
            password: null,
            realPassword:null,
            realEmailAddress:false,
            isOpen: true
        }
    }
    render() {
        return (
            <div className="App">
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}>
                    <div id="connectezvous">Connectez-vous</div>
                    <p class="champConnect"><input class="champConnect" placeholder="Email" name="emailAddress" type="email" value={this.state.emailAddress} onChange={this.onChange}/></p>
                    <p class="champConnect"><input class="champConnect" placeholder="Mot de passe" name="password" type="password" value={this.state.password} onChange={this.onChange}/></p>
                    <a href="/inscription"><button class="boutonModal btn btn-outline-light" onClick={this.toggleModal}>S'inscrire</button></a>
                    <button class="boutonModal btn btn-outline-light" onClick={this.onClick}>Se connecter</button>
                </Modal>
            </div>
        );
    }

    toggleModal = () => {
        this.state.isOpen=false
        this.onChange(this)
    }


    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    onClick = () => {
        Axios.post(`http://localhost:5000/connect`, {
            email: this.state.emailAddress,
            password: this.state.password

        }).then((res) => {
            if(res.data==="Password doesn't match" || res.data==="Email address doesn't exist"){
                console.log("Données incorrectes");
            }
            else {
                this.setState({
                    realEmailAddress: res.data.emailaddress
                })
                if (this.state.emailAddress===this.state.realEmailAddress){
                    this.toggleModal()
                }
            }
        }).catch(err =>{
            console.log(err)
            this.setState({
                emailAddress: this.state.emailAddress,
                password: null
            })
        })
    }
}

export default Connexion