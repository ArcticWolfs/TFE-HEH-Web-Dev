import React, { Component } from 'react'
import "../css/style.css";

import Axios from 'axios'

export class Inscription extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstname: null,
            lastname: null,
            emailAddress: null,
            password: null,
            confirmPassword: null,
            address: null,
            student: null,
            phoneNumberTutor1: null,
            phoneNumberTutor2: null,
            emailTutor1: null,
            emailTutor2: null
        }
    }

    render() {
        return (
            <div>
                <h1>Inscription</h1>

                <p><input placeholder="Prénom" name="firstname" type="text" value={this.state.firstname} onChange={this.onChange} /></p>
                <p><input placeholder="Nom" name="lastname" type="text" value={this.state.lastname} onChange={this.onChange} /></p>
                <p><input placeholder="Email" name="emailAddress" type="email" value={this.state.emailAddress} onChange={this.onChange} /></p>
                <p><input placeholder="Mot de passe" name="password" type="password" value={this.state.password} onChange={this.onChange} /></p>
                <p><input placeholder="Confirmation du mot de passe" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.onChange} /></p>
                <p><input placeholder="Addresse" name="address" type="text" value={this.state.address} onChange={this.onChange} /></p>
                <p><input id="isStudent" placeholder="Etudiant" name="student" type="checkbox" value={this.state.student} onClick={this.toggleDisplay} />Étudiant</p>

                <div id="isShow" style={{display:"none"}}>
                    <p><input placeholder="Téléphone du tuteur 2" name="phoneNumberTutor1" type="text" value={this.state.phoneNumberTutor1} onChange={this.onChange} /></p>
                    <p><input placeholder="Téléphone du tuteur 1" name="phoneNumberTutor2" type="text" value={this.state.phoneNumberTutor2} onChange={this.onChange} /></p>
                    <p><input placeholder="Mail du tuteur 1" name="emailTutor1" type="email" value={this.state.emailTutor1} onChange={this.onChange} /></p>
                    <p><input placeholder="Mail du tuteur 2" name="emailTutor2" type="email" value={this.state.emailTutor2} onChange={this.onChange} /></p>
                </div>
               
                <a id="inscription" href="/inscription"><button onClick={this.onClick} className="btn btn-success">S'inscrire</button></a>
            </div>
        )
    }

    toggleDisplay = () => {
        this.elmt = document.getElementById('isShow');
        if(document.getElementById('isStudent').checked === true) this.elmt.style.display = "";
        else this.elmt.style.display = "none";
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

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
        let v_password = this.state.password;
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
                        if (security.emailVerification(v_emailAddress) === false)
                        {
                            if (security.passwordVerification(v_password) === false)
                            {
                                if (security.studentVerification(v_student) === false)
                                {
                                    if (v_student === 1 || v_student === true || v_student === "1")
                                    {
                                        if (security.phoneVerification(v_phoneNumberTutor1) === false)
                                        {
                                            if (security.phoneVerification(v_phoneNumberTutor2) === false)
                                            {
                                                if (security.emailVerification(v_emailTutor1) === false)
                                                {
                                                    if (security.emailVerification(v_emailTutor2) === false)
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
            if (testOk === true)
            {
                Axios.post(`http://localhost:5000/createUser`, {
                    user_id: null,
                    class_id: null,
                    firstname: v_firstname,
                    lastname: v_lastname,
                    emailAddress: v_emailAddress,
                    password: v_password,
                    address: v_address,
                    inscriptiondate: null,
                    student: v_student,
                    phoneNumberTutor1: v_phoneNumberTutor1,
                    phoneNumberTutor2: v_phoneNumberTutor2,
                    emailTutor1: v_emailTutor1,
                    emailTutor2: v_emailTutor2
                })
                .then(function (res) {
                    console.log(res);
                })
                .catch(function (err){
                    console.log(err)
                }) 
                document.getElementById('inscription').href = "/";
            }
            else
            {
                console.log("Bad character detected aborting the query, please try again!");
            }
        }
        catch (err)
        {
            console.error("Error while creating an user" + err.message);
        }
    }
    
}
export default Inscription