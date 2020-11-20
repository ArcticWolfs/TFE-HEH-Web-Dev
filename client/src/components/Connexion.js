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
            emailAddress: "",
            password: "",
            stayConnect:false,
            isOpen: true
        }
    }
    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}>
                    <div id="connectezvous">Connectez-vous</div>
                    <p className="champConnect"><input class="champConnect" placeholder="Email" name="emailAddress" type="email" value={this.state.emailAddress} onChange={this.onChange}/></p>
                    <p className="champConnect"><input class="champConnect" onKeyDown={this.onKeyDown} placeholder="Mot de passe" name="password" type="password" value={this.state.password} onChange={this.onChange }/></p>
                    <p><input className="check" id="stayConnect" name="stayConnect" type="checkbox" value={this.state.stayConnect} />Rester connecter</p>
                    <button className="boutonModal btn btn-outline-light" onClick={this.toInscription}>S'inscrire</button>
                    <button className="boutonModal btn btn-outline-light" onClick={this.onClick}>Se connecter</button>
                    <p id="passwordForgot"><a href="/#">Mot de passe oublié ?</a></p>
                </Modal>
            </React.Fragment>
        );
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          this.onClick();
        }
      }

    toInscription = () => {
        this.props.toInscript()
    }

    toggleModal = () => {
        this.setState({
            isOpen: false
        })
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
            if(res.data.id){
                this.toggleModal()
                this.props.connect(res.data.id)
            }
            else {
                console.log("Données incorrectes");
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