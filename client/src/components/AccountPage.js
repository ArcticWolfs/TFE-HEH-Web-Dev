import React, { Component } from 'react'
import "../css/style.css";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Axios from 'axios'
import Modification from './Modification';
import ModifEmployee from './ModifEmployee';

export class AccountPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.userId,
            employee: this.props.employee,
            class: null,
            firstname: null,
            lastname: null,
            email: null,
            address: null,
            inscription: null,
            student: null,
            phoneNumberTutor1: null,
            phoneNumberTutor2: null,
            emailTutor1: null,
            emailTutor2: null,
            modifyIsOpen: false,
            open: false
        }

        if(this.state.employee === "false"){
            Axios.get(`http://localhost:5000/getUser/${this.state.id}`).then((res) => {
                this.setState({
                    class: res.data.class_id || "/",
                    firstname: res.data.firstname || "/",
                    lastname: res.data.lastname || "/",
                    email: res.data.emailaddress || "/",
                    address: res.data.address || "/",
                    inscription: res.data.inscriptiondate.split("T",1) || "/",
                    student: res.data.student,
                    phoneNumberTutor1: res.data.phonenumbertutor1 || "/",
                    phoneNumberTutor2: res.data.phonenumbertutor2 || "/",
                    emailTutor1: res.data.emailtutor1 || "/",
                    emailTutor2: res.data.emailtutor2 || "/"
                    
                })
            }).catch(err =>{
                console.log(err)
            })
        } else {
            Axios.get(`http://localhost:5000/getEmployee/${this.state.id}`).then((res) => {
                this.setState({
                    firstname: res.data.firstname || "/",
                    lastname: res.data.lastname || "/",
                    birthdate: res.data.birthdate || "/",
                    address: res.data.address || "/",
                    email: res.data.emailaddress || "/",
                    phoneNumber: res.data.phonenumber || "/",
                    inscription: res.data.inscriptiondate.split("T",1) || "/",
                    functionEmployee: res.data.functionemployee || "/"
                })
            }).catch(err =>{
                console.log(err)
            })
        }    
    }

    render() {
        if (this.state.modifyIsOpen === false && this.state.employee === "false")
        {
            return (
                <React.Fragment>
                    <div id="myAccount">
                        <div id="borderStudent">
                            <h1>Mon compte</h1>
                            <table>
                                <tr>
                                    <td><p>Prénom : </p></td>
                                    <td><p>{this.state.firstname}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Nom : </p></td>
                                    <td><p>{this.state.lastname}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Email : </p></td>
                                    <td><p>{this.state.email}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Adresse : </p></td>
                                    <td><p>{this.state.address}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Classe : </p></td>
                                    <td><p>{this.state.class}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Téléphone tuteur 1 : </p></td>
                                    <td><p>{this.state.phoneNumberTutor1}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Téléphone tuteur 2 : </p></td>
                                    <td><p>{this.state.phoneNumberTutor2}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Email tuteur 1 : </p></td>
                                    <td><p>{this.state.emailTutor1}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Email tuteur 2 : </p></td>
                                    <td><p>{this.state.emailTutor2}</p></td>
                                </tr>
                            </table>
                            
                            <p>Inscription : {this.state.inscription}</p>

                            <button onClick={this.handleClickOpen} id="changeRed" className="boutonModal btn btn-outline-danger">Supprimer</button>
                            <button onClick={this.toModify} className="boutonModal btn btn-outline-light">Modifier</button>

                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                >
                                <DialogTitle id="alert-dialog-title">
                                    {"Attention"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Êtes-vous sûr de vouloir supprimer votre compte ?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.noDeleteAccount} color="primary" class="boutonModal btn btn-outline-light">
                                    Annuler
                                    </Button>
                                    <Button onClick={this.deleteAccount} color="primary" class="boutonModal btn btn-outline-light">
                                    Supprimer
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </React.Fragment>
            )
        }else if (this.state.modifyIsOpen === false && this.state.employee === "true"){
            return (
                <React.Fragment>
                    <div id="myAccount">
                        <div id="borderEmployee">
                            <h1>Mon compte</h1>
                            <table>
                                <tr>
                                    <td><p>Prénom : </p></td>
                                    <td><p>{this.state.firstname}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Nom : </p></td>
                                    <td><p>{this.state.lastname}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Date de naissance : </p></td>
                                    <td><p>{this.state.birthdate}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Adresse : </p></td>
                                    <td><p>{this.state.address}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Email : </p></td>
                                    <td><p>{this.state.email}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Téléphone : </p></td>
                                    <td><p>{this.state.phoneNumber}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Fonction :  </p></td>
                                    <td><p>{this.state.functionEmployee}</p></td>
                                </tr>
                            </table>
                            
                            <p>Inscription : {this.state.inscription}</p>

                            <button onClick={this.handleClickOpen} id="changeRed" className="boutonModal btn btn-outline-danger">Supprimer</button>
                            <button onClick={this.toModify} className="boutonModal btn btn-outline-light">Modifier</button>

                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                >
                                <DialogTitle id="alert-dialog-title">
                                    {"Attention"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Êtes-vous sûr de vouloir supprimer votre compte ?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.noDeleteAccount} color="primary" class="boutonModal btn btn-outline-light">
                                        Annuler
                                    </Button>
                                    <Button onClick={this.deleteAccount} color="primary" class="boutonModal btn btn-outline-light">
                                        Supprimer
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </React.Fragment>
            )
        }else if (this.state.modifyIsOpen === true && this.state.employee === "false"){
            return (
                <React.Fragment>
                    <Modification userId={this.state.id} toModify={this.setToModify}></Modification>
                </React.Fragment>
            )

        }else if (this.state.modifyIsOpen === true && this.state.employee === "true"){
            return (
                <React.Fragment>
                    <ModifEmployee userId={this.state.id} toModify={this.setToModify}></ModifEmployee>
                </React.Fragment>
            )
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    

    noDeleteAccount = () => {
        this.handleClose();
    };

    setToModify = () => {
        this.setState({
            modifyIsOpen: false
        })
    }

    deleteAccount = () =>{
        if (this.state.employee === "false") {
            Axios.delete(`http://localhost:5000/deleteUser/${this.state.id}`, {

            })
            .then(function (res) {
                localStorage.clear()
                sessionStorage.clear()
                document.location.reload()
                console.log(res);
            })
            .catch(function (err){
                console.log(err)
            })
        }
        else {
            Axios.delete(`http://localhost:5000/deleteEmployee/${this.state.id}`, {

            })
            .then(function (res) {
                localStorage.clear()
                sessionStorage.clear()
                document.location.reload()
                console.log(res);
            })
            .catch(function (err){
                console.log(err)
            })
        }
        
    }

    toModify = () => {
        this.setState ({
            modifyIsOpen: true
        })
    }
}
export default AccountPage