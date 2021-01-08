import React, { Component } from 'react'
import "../css/style.css";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Axios from 'axios'
import ModifByAdmin from './ModifByAdmin';

var LIST_ROW = []

export class GestionUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            open2: false,
            actualID: null,
            id: null,
            lastname: null,
            firstname: null,
            class_id: null,
            address: null,
            email: null,
            student: null,
            phoneNumberTutor1: null,
            emailTutor1: null,
            phoneNumberTutor2: null,
            emailTutor2: null
        }

        Axios.get(`http://localhost:5000/getAllUsers`).then((res) => {
            LIST_ROW=[];
            let nbUsers=res.data.length;
            for (let i = 0; i < nbUsers; i++) {
                LIST_ROW.push({id: res.data[i]["user_id"],lastname: res.data[i]["lastname"],firstname: res.data[i]["firstname"],class_id: res.data[i]["class_id"],address: res.data[i]["address"],email: res.data[i]["emailaddress"],student: res.data[i]["student"].toString(),phoneNumberTutor1: res.data[i]["phonenumbertutor1"],emailTutor1: res.data[i]["emailtutor1"],phoneNumberTutor2: res.data[i]["phonenumbertutor2"],emailTutor2: res.data[i]["emailtutor2"]})
                this.setState({ entries: true }, () => {
                    document.getElementById("modify"+res.data[i]["user_id"]).onclick = this.toModify;
                    document.getElementById("delete"+res.data[i]["user_id"]).onclick = this.handleClickOpen;
                });
                
            }
        }).catch(err => console.log(err))
    }

    render() {
        if (this.state.open===false) {
            return (
                <React.Fragment>
                    <div className="centerGestion">
                        <h1>Gestion des utilisateurs</h1>
                    </div>
                    <div>
                        <table className="table table-sm table-dark EmployeeList">
                            <tr>
                                <th scope="col" className="lastname">Nom</th>
                                <th scope="col" className="firstname">Prénom</th>
                                <th scope="col" className="class_id">Classe</th>
                                <th scope="col" className="address">Adresse</th>
                                <th scope="col" className="email">Email</th>
                                <th scope="col" className="student">Étudiant</th>
                                <th scope="col" className="phoneNumberTutor1">Téléphone tuteur 1</th>
                                <th scope="col" className="emailTutor1">Email tuteur 1</th>
                                <th scope="col" className="phoneNumberTutor2">Téléphone tuteur 2</th>
                                <th scope="col" className="emailTutor2">Email tuteur 2</th>
                                <th scope="col" className="modify">Modifier</th>
                                <th scope="col" className="delete">Supprimer</th>
                            </tr>
                            <UserList entries={LIST_ROW}/>
                        </table>
                    </div>
                    <Dialog
                        open={this.state.open2}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">
                            {"Attention"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Êtes-vous sûr de vouloir supprimer ce compte ?
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
                </React.Fragment>
            )
        }
        else if (this.state.open===true){
            return (
                <React.Fragment>
                    <ModifByAdmin userId={this.state.actualID} toModify={this.setToModify} employee={false}></ModifByAdmin>
                </React.Fragment>
            )
        }
    }
    
    toModify = (event) => {
        this.setState({ 
            open: true ,
            actualID: event.target.value
        });
    };

    setToModify = () => {
        this.setState({open: false }, () => {
            for (let i = 0; i < LIST_ROW.length; i++) {
                document.getElementById("modify"+LIST_ROW[i].id).onclick = this.toModify;
                document.getElementById("delete"+LIST_ROW[i].id).onclick = this.handleClickOpen;
            }
        });   
    };

    handleClickOpen = (event) => {
        this.setState({
            open2: true,
            actualID: event.target.value
        });
    };
    
    handleClose = () => {
        this.setState({ open2: false });
    };
    noDeleteAccount = () => {
        this.handleClose();
    };
    deleteAccount = () =>{
        Axios.delete(`http://localhost:5000/deleteUser/${this.state.actualID}`, {

        })
        .then(function (res) {
            document.location.reload()
            console.log(res);
        })
        .catch(function (err){
            console.log(err)
        })
        
    }

}

const UserList = ({ entries }) => (
    
    <tbody>
    {
        entries.map(({id, lastname, firstname, class_id, address, email, student, phoneNumberTutor1, emailTutor1, phoneNumberTutor2, emailTutor2 }) => (
            <tr key={id}>
                <td className="lastname">{lastname}</td>
                <td className="firstname">{firstname}</td>
                <td className="class_id">{class_id}</td>
                <td className="address">{address}</td>
                <td className="email">{email}</td>
                <td className="student">{student}</td>
                <td className="phoneNumberTutor1">{phoneNumberTutor1}</td>
                <td className="emailTutor1">{emailTutor1}</td>
                <td className="phoneNumberTutor2">{phoneNumberTutor2}</td>
                <td className="emailTutor2">{emailTutor2}</td>
                <td className="modify"><button id={"modify"+id} value={id}>Modifier</button></td>
                <td className="delete"><button id={"delete"+id} value={id}>Supprimer</button></td>
            </tr>
        ))
    }   
    </tbody>
    
)

export default GestionUser