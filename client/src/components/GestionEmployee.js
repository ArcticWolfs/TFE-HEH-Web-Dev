import React, { Component } from 'react'
import "../css/style.css";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Axios from 'axios'
import CreateEmployee from './CreateEmployee';
import ModifByAdmin from './ModifByAdmin';
import AttributeClass from './AttributeClass';

var LIST_ROW = []

export class GestionEmployee extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            open: false,
            open2: false,
            isOpen2: false,
            actualID: null,
            id: null,
            lastname: null,
            firstname: null,
            birthdate: null,
            address: null,
            phoneNumber: null,
            functionEmployee: null,
            isAdmin: false
        }

        Axios.get(`http://localhost:5000/getAllEmployees`).then((res) => {
            LIST_ROW=[];
            let nbEmployees=res.data.length;
            for (let i = 0; i < nbEmployees; i++) {
                LIST_ROW.push({id: res.data[i]["employee_id"],lastname: res.data[i]["lastname"],firstname: res.data[i]["firstname"],birthdate: res.data[i]["birthdate"],address: res.data[i]["address"],email: res.data[i]["emailaddress"],phoneNumber: res.data[i]["phonenumber"],functionEmployee: res.data[i]["functionemployee"],isAdmin: res.data[i]["isadmin"].toString()})
                this.setState({ entries: true }, () => {
                    document.getElementById("modify"+res.data[i]["employee_id"]).onclick = this.toModify;
                    document.getElementById("delete"+res.data[i]["employee_id"]).onclick = this.handleClickOpen;
                });
                
            }
        }).catch(err => console.log(err))
    }

    render() {
        if (this.state.isOpen === false && this.state.open===false && this.state.isOpen2===false) {
            return (
                <React.Fragment>
                    <div className="centerGestion">
                        <h1>Gestion du personnel</h1>
                        <button id="buttonCreateEmployee" className="boutonModal btn btn-outline-light" onClick={this.toCreate}>Ajouter un employé</button>
                        <button id="buttonCreateEmployee" className="boutonModal btn btn-outline-light" onClick={this.toAttributeClass}>Attribuer les classes</button>
                    </div>
                    <div>
                        <table className="table table-sm table-dark EmployeeList">
                            <tr>
                                <th scope="col" className="lastname">Nom</th>
                                <th scope="col" className="firstname">Prénom</th>
                                <th scope="col" className="birthdate">Date de naissance</th>
                                <th scope="col" className="address">Adresse</th>
                                <th scope="col" className="email">Email</th>
                                <th scope="col" className="phoneNumber">Téléphone</th>
                                <th scope="col" className="functionEmployee">Fonction</th>
                                <th scope="col" className="isAdmin">Admin</th>
                                <th scope="col" className="modify">Modifier</th>
                                <th scope="col" className="delete">Supprimer</th>
                            </tr>
                            <EmployeeList entries={LIST_ROW}/>
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
        else if (this.state.isOpen===true && this.state.open===false && this.state.isOpen2===false){
            return (
                <React.Fragment>
                    <CreateEmployee toCreate={this.setToCreate}></CreateEmployee>
                </React.Fragment>
            )
        }
        else if (this.state.isOpen===false && this.state.open===true && this.state.isOpen2===false){
            return (
                <React.Fragment>
                    <ModifByAdmin userId={this.state.actualID} toModify={this.setToModify} employee={true}></ModifByAdmin>
                </React.Fragment>
            )
        }
        else if (this.state.isOpen===false && this.state.open===false && this.state.isOpen2===true){
            return (
                <React.Fragment>
                    <AttributeClass toAttributeClass={this.setToAttributeClass}></AttributeClass>
                </React.Fragment>
            )
        }
    }
    toCreate = () => {
        this.setState({ isOpen: true });
    };

    setToCreate = () => {
        this.setState({ isOpen: false });
    };

    toAttributeClass = () => {
        this.setState({ isOpen2: true });
    }

    setToAttributeClass = () => {
        this.setState({ isOpen2: false });
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
        Axios.delete(`http://localhost:5000/deleteEmployee/${this.state.actualID}`, {

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

const EmployeeList = ({ entries }) => (
    
    <tbody>
    {
        entries.map(({id, lastname, firstname, birthdate, address, email, phoneNumber, functionEmployee, isAdmin }) => (
            <tr key={id}>
                <td className="lastname">{lastname}</td>
                <td className="firstname">{firstname}</td>
                <td className="birthdate">{birthdate}</td>
                <td className="address">{address}</td>
                <td className="email">{email}</td>
                <td className="phoneNumber">{phoneNumber}</td>
                <td className="functionEmployee">{functionEmployee}</td>
                <td className="isAdmin">{isAdmin}</td>
                <td className="modify"><button id={"modify"+id} value={id}>Modifier</button></td>
                <td className="delete"><button id={"delete"+id} value={id}>Supprimer</button></td>
            </tr>
        ))
    }   
    </tbody>
    
)

export default GestionEmployee