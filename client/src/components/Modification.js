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

export class Modification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.userId,
            firstname: "",
            lastname: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            address: "",
            student: "",
            phoneNumberTutor1: "",
            phoneNumberTutor2: "",
            emailTutor1: "",
            emailTutor2: "",
            isOpen: true,
            open: false,
            oldPassword: "",
            isOpen2: false,
            textError: ""
        }

        Axios.get(`http://localhost:5000/getUser/${this.state.id}`).then((res) => {
            this.setState({
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                emailAddress: res.data.emailaddress,
                oldEmailAddress: res.data.emailaddress,
                address: res.data.address,
                student: res.data.student,
                phoneNumberTutor1: res.data.phonenumbertutor1 || "",
                phoneNumberTutor2: res.data.phonenumbertutor2 || "",
                emailTutor1: res.data.emailtutor1 || "",
                emailTutor2: res.data.emailtutor || ""
                
            })
        }).catch(err =>{
            console.log(err)
        })
        
    }

    render() {
        if (this.state.student===true) {
            document.getElementById('isStudent').checked = true;
            document.getElementById('isShow').style.display = "";
        }
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlaymodif"
                    closeTimeoutMS={500}>
                    <div id="inscrivezvous">Modification</div>

                    <p><input className="champConnect" placeholder="Prénom" onKeyDown={this.onKeyDown} name="firstname" type="text" value={this.state.firstname} onChange={this.onChange} pattern="[A-Z][a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]+" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Nom" onKeyDown={this.onKeyDown} name="lastname" type="text" value={this.state.lastname} onChange={this.onChange} pattern="[A-Z][a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]+" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Email" onKeyDown={this.onKeyDown} name="emailAddress" type="email" value={this.state.emailAddress} onChange={this.onChange} pattern="[a-z.]+[@][a-z]+[.][a-z]+" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Addresse" onKeyDown={this.onKeyDown} name="address" type="text" value={this.state.address} onChange={this.onChange} pattern="[A-Za-z0-9 ',àáâãäåçèéêëìíîïðòóôõöùúûüýÿ-]+" onFocus={this.setRequired}/></p>
                    <p><input className="champConnect" placeholder="Mot de passe" onKeyDown={this.onKeyDown} name="password" type="password" value={this.state.password} onChange={this.onChange}/></p>
                    <p><input id="cpswd" className="champConnect" placeholder="Confirmez mot de passe" onKeyDown={this.onKeyDown} name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.onChange}/></p>
                    <p><input className="check" id="isStudent" placeholder="Etudiant" onKeyDown={this.onKeyDown} name="student" type="checkbox" value={this.state.student} onClick={this.toggleDisplay} />Étudiant</p>

                    <div id="isShow" style={{display:"none"}}>
                        <p><input className="champConnect" placeholder="Téléphone du tuteur 1" onKeyDown={this.onKeyDown} name="phoneNumberTutor1" type="text" value={this.state.phoneNumberTutor1} onChange={this.onChange} pattern="[0-9/. +]+" onFocus={this.setRequired}/></p>
                        <p><input className="champConnect" placeholder="Téléphone du tuteur 2" onKeyDown={this.onKeyDown} name="phoneNumberTutor2" type="text" value={this.state.phoneNumberTutor2} onChange={this.onChange} pattern="[0-9/. +]+"/></p>
                        <p><input className="champConnect" placeholder="Mail du tuteur 1" onKeyDown={this.onKeyDown} name="emailTutor1" type="email" value={this.state.emailTutor1} onChange={this.onChange} pattern="[a-z.]+[@][a-z]+[.][a-z]+" onFocus={this.setRequired}/></p>
                        <p><input className="champConnect" placeholder="Mail du tuteur 2" onKeyDown={this.onKeyDown} name="mail_Tutor2" type="email" value={this.state.emailTutor2} onChange={this.onChange} pattern="[a-z.]+[@][a-z]+[.][a-z]+"/></p>
                    </div>
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
            employee: false

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

    toggleDisplay = () => {
        this.elmt = document.getElementById('isShow');
        if(document.getElementById('isStudent').checked === true) this.elmt.style.display = "";
        else this.elmt.style.display = "none";
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
        this.isStudent = 0;
        if(document.getElementById('isStudent').checked === true){
            this.isStudent = 1;
        }

        const Security = require("../Security");
        const security = new Security();

        let v_lastname = this.state.lastname;
        let v_firstname = this.state.firstname;
        let v_address = this.state.address;
        let v_emailAddress = this.state.emailAddress;
        let v_password;
        if(this.state.password !== "") v_password = this.state.password;
        else v_password = this.state.oldPassword;
        let v_student = this.isStudent;
        let v_phoneNumberTutor1 = this.state.phoneNumberTutor1;
        let v_phoneNumberTutor2 = this.state.phoneNumberTutor2;
        let v_emailTutor1 = this.state.emailTutor1;
        let v_emailTutor2 = this.state.emailTutor2;

        try
        {
            if (v_student === 1 || v_student === true || v_student === "1")
            {
                try
                {
                    v_phoneNumberTutor1 = v_phoneNumberTutor1.trim();
                    v_phoneNumberTutor2 = v_phoneNumberTutor2.trim();
                    v_emailTutor1 = v_emailTutor1.trim();
                    v_emailTutor2 = v_emailTutor2.trim();
                }
                catch (error)
                {
                    console.log("trying to trim nonexistent data");
                }
            }

            v_firstname = v_firstname.trim();
            v_lastname = v_lastname.trim();
            v_address = v_address.trim();
            v_emailAddress = v_emailAddress.trim();
            v_password = v_password.trim();

            let testOk = false;

            if (security.firstNameVerification(v_firstname) === false)
            {
                if (security.lastNameVerification(v_lastname) === false)
                {
                    if (security.addressVerification(v_address) === false)
                    {
                        if (security.emailVerification(v_emailAddress,"student") === false)
                        {
                            if (security.passwordVerification(v_password) === false)
                            {
                                if (security.studentVerification(v_student) === false)
                                {
                                    if (v_student === 1 || v_student === true || v_student === "1")
                                    {
                                        if (security.phoneVerification(v_phoneNumberTutor1,"parent") === false)
                                        {
                                            if (security.phoneVerification(v_phoneNumberTutor2,"parent2") === false)
                                            {
                                                if (security.emailVerification(v_emailTutor1,"parent") === false)
                                                {
                                                    if (security.emailVerification(v_emailTutor2,"parent2") === false)
                                                    {
                                                        testOk = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        v_emailTutor1 = "undefined";
                                        v_emailTutor2 = "undefined";
                                        v_phoneNumberTutor1 = "undefined";
                                        v_phoneNumberTutor2 = "undefined";
                                        testOk = true;
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
                Axios.put(`http://localhost:5000/modifyUser/${this.state.id}`, {
                    firstname: v_firstname,
                    lastname: v_lastname,
                    emailAddress: v_emailAddress,
                    password: v_password,
                    address: v_address,
                    student: v_student,
                    oldEmail: this.state.oldEmailAddress,
                    phoneNumberTutor1: v_phoneNumberTutor1,
                    phoneNumberTutor2: v_phoneNumberTutor2,
                    emailTutor1: v_emailTutor1,
                    emailTutor2: v_emailTutor2
                })
                .then((res) => {
                    if(res.data === "User Updated"){
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
                else if (this.state.firstname === "" || this.state.lastname==="" || this.state.emailAddress==="" || this.state.password==="" || this.state.confirmPassword===""||this.state.address===""||this.state.phoneNumberTutor1===""||this.state.emailTutor1===""){
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
export default Modification
