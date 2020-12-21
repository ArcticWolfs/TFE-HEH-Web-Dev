import React, { Component } from 'react'
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Axios from 'axios'
import Modal from "react-modal";

Modal.setAppElement("#root");

export class ModifEmployee extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.userId,
            firstname: "",
            lastname: "",
            birthdate: "",
            address: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            functionEmployee: "",
            isAdmin: "",
            isOpen: true,
            open: false,
            oldPassword: "",
            isOpen2: false,
            textError: ""
        }

        Axios.get(`http://localhost:5000/getEmployee/${this.state.id}`).then((res) => {
            this.setState({
                firstname: res.data.firstname || "/",
                lastname: res.data.lastname || "/",
                birthdate: res.data.birthdate || "/",
                address: res.data.address || "/",
                email: res.data.emailaddress || "/",
                oldEmailAddress: res.data.emailaddress,
                phoneNumber: res.data.phonenumber || "/",
                inscription: res.data.inscriptiondate.split("T",1) || "/",
                functionEmployee: res.data.functionemployee || "/",
                isAdmin: res.data.isadmin
            })
        }).catch(err =>{
            console.log(err)
        })
        
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlaymodif"
                    closeTimeoutMS={500}>
                    <div id="inscrivezvous">Modification</div>

                    <p><input className="champConnect" placeholder="Prénom" name="firstname" type="text" value={this.state.firstname} onChange={this.onChange} pattern="[A-Z][a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]+" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Nom" name="lastname" type="text" value={this.state.lastname} onChange={this.onChange} pattern="[A-Z][a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]+" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Naissance (xx/xx/xxxx)" name="birthdate" type="text" value={this.state.birthdate} onChange={this.onChange} pattern="[0-9]{2}[/][0-9]{2}[/][0-9]{4}||[0-9]{4}[-][0-9]{2}[-][0-9]{2}" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Addresse" name="address" type="text" value={this.state.address} onChange={this.onChange} pattern="[A-Za-z0-9 ',àáâãäåçèéêëìíîïðòóôõöùúûüýÿ-]+" onFocus={this.setRequired}/></p>
                    <p><input id="mail" className="champConnect" placeholder="Email" name="email" type="email" value={this.state.email} onChange={this.onChange} pattern="[a-z.0-9]+[@][a-z]+[.][a-z]+" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Téléphone" name="phoneNumber" type="text" value={this.state.phoneNumber} onChange={this.onChange} pattern="[0-9/. +]+" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Fonction" name="functionEmployee" type="text" value={this.state.functionEmployee} onChange={this.onChange} pattern="[A-Z][a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]+" onFocus={this.setRequired}/></p>
                    <p><input id="pswd" className="champConnect" placeholder="Mot de passe" name="password" type="password" value={this.state.password} onChange={this.onChange}/></p>
                    <p><input id="cpswd" className="champConnect" placeholder="Confirmez mot de passe" onKeyDown={this.onKeyDown} name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.onChange} /></p>
                    
                    <button onClick={this.cancel} className="boutonModal btn btn-outline-light">Annuler</button>
                    <button onClick={this.handleClickOpen} className="boutonModal btn btn-outline-light">Modifier</button>
                </Modal>

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
                            Veuillez confirmer votre mot de passe :
                            <input style={{"margin-left":"0.3em"}} placeholder="Mot de passe" onKeyDown={this.accept} name="oldPassword" type="password" value={this.state.oldPassword} onChange={this.onChange} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.noVerif} color="primary" class="boutonModal btn btn-outline-light">
                        Annuler
                        </Button>
                        <Button onClick={this.verif} color="primary" class="boutonModal btn btn-outline-light">
                        Modifier
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.isOpen2}
                    onClose={this.handleIsClose2}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {this.state.textError}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleIsClose2} color="primary" class="boutonModal btn btn-outline-light">
                        Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment> 
        )
    }

    setRequired = (event) => {
        event.target.required = true;
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleIsOpen2 = () => {
        this.setState({ isOpen2: true });
    };

    handleIsClose2 = () => {
        this.setState({ isOpen2: false });
    };
    

    noVerif = () => {
        this.setState({
            oldPassword:""
        })
        this.handleClose();
    };

    verif = () => {
        Axios.post(`http://localhost:5000/connect`, {
            email: this.state.oldEmailAddress,
            password: this.state.oldPassword,
            employee: true

        }).then((res) => {
            if(res.data.id){
                this.onClick();
            }
            else {
                console.log("Données incorrectes");
                this.handleIsOpen2()
                this.setState({textError: "Mot de passe incorrect"})
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          this.handleClickOpen();
        }
    }

    accept = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          this.verif();
        }
    }
    
    cancel = () => {
        this.toggleModal()
        this.props.toModify()
    }

    toggleModal = () => {
        this.setState({
            isOpen: false
        })
    }

    verifPassword = () => {
        if (this.state.password !== this.state.confirmPassword && this.state.confirmPassword !== ""){
            document.getElementById("cpswd").style.boxShadow = "0 0 5px 1px red";
        }
        else if (this.state.password === this.state.confirmPassword && this.state.confirmPassword !== "") document.getElementById("cpswd").style.boxShadow = "none";
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.verifPassword())

    }

    onClick = () =>{
        const Security = require("../Security");
        const security = new Security();

        let v_firstname = this.state.firstname;
        let v_lastname = this.state.lastname;
        let v_birthdate = this.state.birthdate;
        let v_address = this.state.address;
        let v_emailAddress = this.state.email;
        let v_phoneNumber = this.state.phoneNumber;
        let v_password;
        if(this.state.password !== "") v_password = this.state.password;
        else v_password = this.state.oldPassword;
        let v_functionEmployee = this.state.functionEmployee;
        let v_isAdmin = this.state.isAdmin;

        try
        {
            v_firstname = v_firstname.trim();
            v_lastname = v_lastname.trim();
            v_birthdate = v_birthdate.trim();
            v_address = v_address.trim();
            v_emailAddress = v_emailAddress.trim();
            v_emailAddress = v_emailAddress.toLowerCase();
            v_phoneNumber = v_phoneNumber.trim();
            v_password = v_password.trim();
            v_functionEmployee = v_functionEmployee.trim();

            let testOk = false;

            if (security.firstNameVerification(v_firstname) === false) {
                if (security.lastNameVerification(v_lastname) === false) {
                    if (security.birthdateVerification(v_birthdate) === false) {
                        if (security.addressVerification(v_address) === false) {
                            if (security.emailVerification(v_emailAddress,"employee") === false) {
                                if (security.phoneVerification(v_phoneNumber,"Employee") === false) {
                                    if (security.passwordVerification(v_password) === false) {
                                        if (security.adminVerification(v_isAdmin) === false) {
                                            if (security.functionEmployeeVerification(v_functionEmployee) === false) {
                                                testOk=true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (this.state.password !== this.state.confirmPassword) testOk = false;

            if (testOk === true)
            {
                Axios.put(`http://localhost:5000/modifyEmployee/${this.state.id}`, {
                    firstname: v_firstname,
                    lastname: v_lastname,
                    birthdate: v_birthdate,
                    address: v_address,
                    emailAddress: v_emailAddress,
                    oldEmail: this.state.oldEmailAddress,
                    phoneNumber: v_phoneNumber,
                    password: v_password,
                    functionEmployee: v_functionEmployee,
                    isAdmin: v_isAdmin
                })
                .then((res) => {
                    if(res.data === "Employee Updated"){
                        this.handleClose()
                        this.toggleModal()
                        document.location.reload()
                    }
                    else {
                        this.handleIsOpen2()
                        this.setState({textError: "Email déjà utilisé"})
                    }   
                })
                .catch(function (err){
                    console.log(err)
                }) 
            }
            else
            {
                console.log("Bad character detected aborting the query, please try again!");
                this.handleIsOpen2()
                if (this.state.password !== this.state.confirmPassword) this.setState({textError: "Mots de passe différents"})
                else if (this.state.firstname === "" || this.state.lastname==="" || this.state.birthdate==="" || this.state.address==="" || this.state.email==="" || this.state.phoneNumber==="" || this.state.password==="" || this.state.confirmPassword==="" || this.state.functionEmployee===""){
                    this.setState({textError: "Un champ obligatoire n'a pas été complété"})
                }
                else this.setState({textError: "Caractère(s) invalide(s) utilisé(s)"})
            }
        }
        catch (err)
        {
            console.error("Error while creating an user" + err.message);
        }
    }
    
}
export default ModifEmployee
