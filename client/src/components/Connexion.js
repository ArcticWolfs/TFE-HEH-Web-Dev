import React, { Component } from 'react'
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

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
            isOpen: true,
            open: false
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
                    <p id="imEmployee"><a href="/#">Je suis un membre du personnel</a></p>
                    
                </Modal>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        Email ou mot de passe incorrect
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" class="boutonModal btn btn-outline-light">
                        Ok
                        </Button>
                    </DialogActions>
                </Dialog>
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

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

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
                if(document.getElementById('stayConnect').checked === true)localStorage.setItem('userID', res.data.id);
                else sessionStorage.setItem('userID', res.data.id);
                document.location.reload()
            }
            else {
                console.log("Données incorrectes");
                this.handleOpen()
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