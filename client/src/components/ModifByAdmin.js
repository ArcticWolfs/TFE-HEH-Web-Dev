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

export class ModifByAdmin extends Component {

    constructor(props) {
        super(props)

        if(this.props.employee===true){

            this.state = {
                id: this.props.userId,
                firstname: "",
                lastname: "",
                birthdate: "",
                address: "",
                phoneNumber: "",
                functionEmployee: "",
                isAdmin: "",
                isOpen: true,
                isOpen2: false,
                textError: ""
            }

            Axios.get(`http://localhost:5000/getEmployee/${this.state.id}`).then((res) => {
                this.setState({
                    firstname: res.data.firstname || "/",
                    lastname: res.data.lastname || "/",
                    birthdate: res.data.birthdate || "/",
                    address: res.data.address || "/",
                    phoneNumber: res.data.phonenumber || "/",
                    inscription: res.data.inscriptiondate.split("T",1) || "/",
                    functionEmployee: res.data.functionemployee || "/",
                    isAdmin: res.data.isadmin
                })
            }).catch(err =>{
                console.log(err)
            })
        }
        else {
            this.state = {
                id: this.props.userId,
                firstname: "",
                lastname: "",
                address: "",
                student: "",
                phoneNumberTutor1: "",
                phoneNumberTutor2: "",
                emailTutor1: "",
                emailTutor2: "",
                isOpen: true,
                isOpen2: false,
                textError: ""
            }
    
            Axios.get(`http://localhost:5000/getUser/${this.state.id}`).then((res) => {
                this.setState({
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    address: res.data.address,
                    student: res.data.student,
                    phoneNumberTutor1: res.data.phonenumbertutor1 || "",
                    phoneNumberTutor2: res.data.phonenumbertutor2 || "",
                    emailTutor1: res.data.emailtutor1 || "",
                    emailTutor2: res.data.emailtutor2 || ""
                    
                })
            }).catch(err =>{
                console.log(err)
            })
        }
        
    }

    render() {
        if (this.props.employee===true){

            if (this.state.isAdmin===true) {
                document.getElementById('isAdmin').checked = true;
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

                        <p><input className="champConnect" placeholder="Prénom" name="firstname" type="text" value={this.state.firstname} onChange={this.onChange} pattern="[A-Z][a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]+" onFocus={this.setRequired}/></p>
                        <p><input className="champConnect" placeholder="Nom" name="lastname" type="text" value={this.state.lastname} onChange={this.onChange} pattern="[A-Z][a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]+" onFocus={this.setRequired}/></p>
                        <p><input className="champConnect" placeholder="Naissance (xx/xx/xxxx)" name="birthdate" type="text" value={this.state.birthdate} onChange={this.onChange} pattern="[0-9]{2}[/][0-9]{2}[/][0-9]{4}||[0-9]{4}[-][0-9]{2}[-][0-9]{2}" onFocus={this.setRequired}/></p>
                        <p><input className="champConnect" placeholder="Addresse" name="address" type="text" value={this.state.address} onChange={this.onChange} pattern="[A-Za-z0-9 ',àáâãäåçèéêëìíîïðòóôõöùúûüýÿ-]+" onFocus={this.setRequired}/></p>
                        <p><input className="champConnect" placeholder="Téléphone" name="phoneNumber" type="text" value={this.state.phoneNumber} onChange={this.onChange} pattern="[0-9/. +]+" onFocus={this.setRequired}/></p>
                        <p><input className="champConnect" placeholder="Fonction" name="functionEmployee" type="text" value={this.state.functionEmployee} onChange={this.onChange} pattern="[A-Z][a-zA-Zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ '-]+" onFocus={this.setRequired}/></p>
                        <p><input className="check" id="isAdmin" placeholder="Admin" name="isAdmin" type="checkbox" value={this.state.isAdmin} />Admin</p>
                        
                        <button onClick={this.toggleModal} className="boutonModal btn btn-outline-light">Annuler</button>
                        <button onClick={this.onClick} className="boutonModal btn btn-outline-light">Modifier</button>
                    </Modal>

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
        else {
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
                        <p><input className="champConnect" placeholder="Addresse" onKeyDown={this.onKeyDown} name="address" type="text" value={this.state.address} onChange={this.onChange} pattern="[A-Za-z0-9 ',àáâãäåçèéêëìíîïðòóôõöùúûüýÿ-]+" onFocus={this.setRequired}/></p>
                        <p><input className="check" id="isStudent" placeholder="Etudiant" onKeyDown={this.onKeyDown} name="student" type="checkbox" value={this.state.student} onClick={this.toggleDisplay} />Étudiant</p>
    
                        <div id="isShow" style={{display:"none"}}>
                            <p><input className="champConnect" placeholder="Téléphone du tuteur 1" onKeyDown={this.onKeyDown} name="phoneNumberTutor1" type="text" value={this.state.phoneNumberTutor1} onChange={this.onChange} pattern="[0-9/. +]+" onFocus={this.setRequired}/></p>
                            <p><input className="champConnect" placeholder="Téléphone du tuteur 2" onKeyDown={this.onKeyDown} name="phoneNumberTutor2" type="text" value={this.state.phoneNumberTutor2} onChange={this.onChange} pattern="[0-9/. +]+"/></p>
                            <p><input className="champConnect" placeholder="Mail du tuteur 1" onKeyDown={this.onKeyDown} name="emailTutor1" type="email" value={this.state.emailTutor1} onChange={this.onChange} pattern="[a-z.0-9]+[@][a-z]+[.][a-z]+" onFocus={this.setRequired}/></p>
                            <p><input className="champConnect" placeholder="Mail du tuteur 2" onKeyDown={this.onKeyDown} name="emailTutor2" type="email" value={this.state.emailTutor2} onChange={this.onChange} pattern="[a-z.0-9]+[@][a-z]+[.][a-z]+"/></p>
                        </div>
                        <button onClick={this.toggleModal} className="boutonModal btn btn-outline-light">Annuler</button>
                        <button onClick={this.onClick} className="boutonModal btn btn-outline-light">Modifier</button>
                    </Modal>
    
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
    }

    setRequired = (event) => {
        event.target.required = true;
    }

    handleIsOpen2 = () => {
        this.setState({ isOpen2: true });
    };

    handleIsClose2 = () => {
        this.setState({ isOpen2: false });
    };

    onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          this.onClick();
        }
    }

    toggleModal = () => {
        this.setState({
            isOpen: false
        })
        this.props.toModify()
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    toggleDisplay = () => {
        this.elmt = document.getElementById('isShow');
        if(document.getElementById('isStudent').checked === true) this.elmt.style.display = "";
        else this.elmt.style.display = "none";
    }

    onClick = () =>{
        if(this.props.employee===true){
            this.state.isAdmin = 0;
            if(document.getElementById('isAdmin').checked === true){
                this.state.isAdmin = 1;
            }
            const Security = require("../Security");
            const security = new Security();

            let v_firstname = this.state.firstname;
            let v_lastname = this.state.lastname;
            let v_birthdate = this.state.birthdate;
            let v_address = this.state.address;
            let v_phoneNumber = this.state.phoneNumber;
            let v_functionEmployee = this.state.functionEmployee;
            let v_isAdmin = this.state.isAdmin;

            try
            {
                v_firstname = v_firstname.trim();
                v_lastname = v_lastname.trim();
                v_birthdate = v_birthdate.trim();
                v_address = v_address.trim();
                v_phoneNumber = v_phoneNumber.trim();
                v_functionEmployee = v_functionEmployee.trim();

                let testOk = false;

                if (security.firstNameVerification(v_firstname) === false) {
                    if (security.lastNameVerification(v_lastname) === false) {
                        if (security.birthdateVerification(v_birthdate) === false) {
                            if (security.addressVerification(v_address) === false) {
                                if (security.phoneVerification(v_phoneNumber,"Employee") === false) {
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

                if (testOk === true)
                {
                    Axios.put(`http://localhost:5000/modifyEmployee_admin/${this.state.id}`, {
                        firstname: v_firstname,
                        lastname: v_lastname,
                        birthdate: v_birthdate,
                        address: v_address,
                        phoneNumber: v_phoneNumber,
                        functionEmployee: v_functionEmployee,
                        isAdmin: v_isAdmin
                    })
                    .then((res) => {
                        if(res.data === "Employee Updated"){
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
                    if (this.state.firstname === "" || this.state.lastname==="" || this.state.birthdate==="" || this.state.address==="" || this.state.email==="" || this.state.phoneNumber==="" || this.state.functionEmployee===""){
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
        //-------------------------------------------------------------------------------------
        else {
            this.isStudent = 0;
            if(document.getElementById('isStudent').checked === true){
                this.isStudent = 1;
            }
            const Security = require("../Security");
            const security = new Security();

            let v_lastname = this.state.lastname;
            let v_firstname = this.state.firstname;
            let v_address = this.state.address;
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

                let testOk = false;

                if (security.firstNameVerification(v_firstname) === false)
                {
                    if (security.lastNameVerification(v_lastname) === false)
                    {
                        if (security.addressVerification(v_address) === false)
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

                if (testOk === true)
                {
                    Axios.put(`http://localhost:5000/modifyUser_admin/${this.state.id}`, {
                        firstname: v_firstname,
                        lastname: v_lastname,
                        address: v_address,
                        student: v_student,
                        phoneNumberTutor1: v_phoneNumberTutor1,
                        phoneNumberTutor2: v_phoneNumberTutor2,
                        emailTutor1: v_emailTutor1,
                        emailTutor2: v_emailTutor2
                    })
                    .then((res) => {
                        if(res.data === "User Updated"){
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
                    if (this.state.firstname === "" || this.state.lastname==="" || this.state.address===""||this.state.phoneNumberTutor1===""||this.state.emailTutor1===""){
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
    
}
export default ModifByAdmin
